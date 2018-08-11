<?php
class addMeeting extends meridyen_plugin
{
	private $meridyen;
	
	public function __construct(&$meridyen)
    {
    	parent::__construct();
		$this->meridyen = $meridyen;
   	}
	
	public function getMainHTML()
	{
		return '
			<div id="addMeeting_containerDiv">
				<div id="addMeeting_inputsContainer">
					<div id="addMeeting_leftDiv">
						<div class="addMeeting_inputDiv">
							<label class="addMeeting_label" style="font-weight:bold;color:red;">Firma Kotası:</label>
							<label class="addMeeting_label" style="font-weight:bold;color:red;text-align:left;margin-left:0px;width:250px;" id="addMeeting_maxLockLabel"></label>
						</div>
						<div class="addMeeting_inputDiv">
							<label class="addMeeting_label">Tür:</label>
							<div class="addMeeting_selectDiv">
								<select id="addMeeting_meetingTypeSelect" class="addMeeting_input">
									<option value="-1">Seçiniz</option>
									<option value="0">Görüşme</option>
									<option value="1">Randevu</option>
								</select>
							</div>
						</div>
						<div class="addMeeting_inputDiv">
							<label class="addMeeting_label">Şirket Yetkilisi:</label>
							<div class="addMeeting_selectDiv">
								<select id="addMeeting_customerContactSelect" class="addMeeting_input">
									<option value="-1">Seçiniz</option>
								</select>
							</div>
						</div>
						<div class="addMeeting_inputDiv">
							<label class="addMeeting_label">Fuar:</label>
							<div class="addMeeting_selectDiv">
								<select id="addMeeting_fairSelect" class="addMeeting_input">
									<option value="-1">Seçiniz</option>
								</select>
							</div>
						</div>
						<div class="addMeeting_inputDiv">
							<label class="addMeeting_label">Görüşme Tarihi:</label>
							<input class="addMeeting_input" id="addMeeting_meetingDateInput" type="text"/>
						</div>
					</div>
					<div id="addMeeting_rightDiv">
						<div class="addMeeting_inputDiv">
							<label class="addMeeting_label">Başlık:</label>
							<input class="addMeeting_input" id="addMeeting_titleInput" type="text"/>
						</div>
						<div class="addMeeting_inputDiv" style="height:80px;">
							<label class="addMeeting_label">Açıklama:</label>
							<textarea id="addMeeting_descriptionInput" rows="6" cols="49" style="resize:none;"></textarea>
						</div>
					</div>
				</div>
				<div id="addMeeting_buttonContainer" style="margin-top: 5px;">
					<button id="addMeeting_submitButton" onclick="addMeeting_saveMeeting()">Kaydet</button>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/addMeeting/addMeeting.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/addMeeting/addMeeting.css";
		return $this->cssList;
	}
	
	public static function getFairs($meridyen,$customerId)
	{
		$data = array();
		$db = $meridyen->db;
		if($meridyen->user->accessLevel == 1)
		{
			$getFairsStatement = $db->prepare("SELECT fairId,name FROM fair WHERE sectorId=? ORDER BY startDate DESC");
			$getFairsStatement->bind_param("d",$meridyen->user->sectorId);
			if($getFairsStatement->execute())
			{
				$data["fairs"] = array();
				$data["status"] = "Ok";
				$getFairsStatement->store_result();
				$getFairsStatement->bind_result($fairId, $name);
				while($getFairsStatement->fetch())
				{
					$data["fairs"][] = array("fairId" => $fairId, "name" => $name);
				}
				$getFairsStatement->free_result();
			}
			else
				$data["status"] = "Error";
			$getFairsStatement->close();
		}
		else if($meridyen->user->accessLevel == 2 || $meridyen->user->accessLevel == 4)
		{
			$getFairsStatement = $db->prepare("SELECT fairId,name FROM fair f, customersectorrelation cs WHERE f.sectorId=cs.sectorId AND
				cs.customerId=? ORDER BY startDate DESC");
			$getFairsStatement->bind_param("d",$customerId);
			if($getFairsStatement->execute())
			{
				$data["fairs"] = array();
				$data["status"] = "Ok";
				$getFairsStatement->store_result();
				$getFairsStatement->bind_result($fairId, $name);
				while($getFairsStatement->fetch())
				{
					$data["fairs"][] = array("fairId" => $fairId, "name" => $name);
				}
				$getFairsStatement->free_result();
			}
			else
				$data["status"] = "Error";
			$getFairsStatement->close();
		}
		return $data;
	}
	
	public static function getCustomerContacts($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCustomerContactsStatement = $db->prepare("SELECT customerContactId,name,surname FROM customercontact WHERE customerId=?");
		$getCustomerContactsStatement->bind_param("d",$customerId);
		if($getCustomerContactsStatement->execute())
		{
			$data["status"] = "Ok";
			$data["contacts"] = array();
			$getCustomerContactsStatement->store_result();
			$getCustomerContactsStatement->bind_result($customerContactId, $name, $surname);
			while($getCustomerContactsStatement->fetch())
			{
				$data["contacts"][] = array("contactId" => $customerContactId, "name" => ($name . " " . $surname));
			}
			$getCustomerContactsStatement->free_result();
		}
		$getCustomerContactsStatement->close();
		return $data;
	}
	
	public static function getMTRemainingLockCount($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getMTLockCountStatement = $db->prepare("SELECT count(distinct(customerId)) FROM customerlock WHERE untilDate >= curdate() AND userId=? AND lockType != 2");
		$getMTLockCountStatement->bind_param("d",$meridyen->user->userId);
		$getMTLockCountStatement->execute();
		$getMTLockCountStatement->store_result();
		$getMTLockCountStatement->bind_result($mtLockCount);
		$getMTLockCountStatement->fetch();
		$getMTLockCountStatement->free_result();
		$getMTLockCountStatement->close();
		
		$getMTCustomerLockCountStatement = $db->prepare("SELECT count(*) FROM customerlock WHERE untilDate >= curdate() AND customerId=? AND userId=?");
		$getMTCustomerLockCountStatement->bind_param("dd",$customerId,$meridyen->user->userId);
		$getMTCustomerLockCountStatement->execute();
		$getMTCustomerLockCountStatement->store_result();
		$getMTCustomerLockCountStatement->bind_result($mtCustomerLockCount);
		$getMTCustomerLockCountStatement->fetch();
		$getMTCustomerLockCountStatement->free_result();
		$getMTCustomerLockCountStatement->close();
		
		if($meridyen->user->maxLockCount == $mtLockCount && $mtCustomerLockCount == 0)
		{
			$data["status"] = "Ok";
			$data["lockCount"] = 0;
		
		}
		else if($mtCustomerLockCount > 0)
		{
			$data["status"] = "Ok";
			$data["lockCount"] = "Kota uygulanmamaktadır.";
		}
		else
		{
			$data["status"] = "Ok";
			$data["lockCount"] = $meridyen->user->maxLockCount - $mtLockCount;
		}
		return $data;
	}
	
	public static function saveMeeting($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getCustomerLockStatement = $db->prepare("SELECT count(distinct(userId)) FROM customerlock WHERE untilDate >= curdate() AND customerId=? AND userId!=?");
		$getCustomerLockStatement->bind_param("dd",$postArray["customerId"], $meridyen->user->userId);
		$getCustomerLockStatement->execute();
		$getCustomerLockStatement->store_result();
		$getCustomerLockStatement->bind_result($lockCount);
		$getCustomerLockStatement->fetch();
		$getCustomerLockStatement->free_result();
		$getCustomerLockStatement->close();
		if($lockCount > 0)
		{
			$data["status"] = "lockError";
			return $data;
		}
		
		$getMTLockCountStatement = $db->prepare("SELECT count(distinct(customerId)) FROM customerlock WHERE untilDate >= curdate() AND userId=? AND lockType != 2");
		$getMTLockCountStatement->bind_param("d",$meridyen->user->userId);
		$getMTLockCountStatement->execute();
		$getMTLockCountStatement->store_result();
		$getMTLockCountStatement->bind_result($mtLockCount);
		$getMTLockCountStatement->fetch();
		$getMTLockCountStatement->free_result();
		$getMTLockCountStatement->close();
		
		$getMTCustomerLockCountStatement = $db->prepare("SELECT count(*) FROM customerlock WHERE untilDate >= curdate() AND customerId=? AND userId=?");
		$getMTCustomerLockCountStatement->bind_param("dd",$postArray["customerId"],$meridyen->user->userId);
		$getMTCustomerLockCountStatement->execute();
		$getMTCustomerLockCountStatement->store_result();
		$getMTCustomerLockCountStatement->bind_result($mtCustomerLockCount);
		$getMTCustomerLockCountStatement->fetch();
		$getMTCustomerLockCountStatement->free_result();
		$getMTCustomerLockCountStatement->close();
		
		if($meridyen->user->maxLockCount == $mtLockCount && $mtCustomerLockCount == 0)
		{
			$data["status"] = "maxLockError";
			return $data;
		}
		
		$dateInput = $postArray["meetingDate"];
		$dateSplitted = explode("/",$dateInput);
		$dateMerged = $dateSplitted[2] . "-" . $dateSplitted[1] . "-" . $dateSplitted[0];
		
		$todayWithTime = new DateTime("now");
		$today = new DateTime($todayWithTime->format('Y-m-d'));
		$meetingDate = new DateTime($dateMerged);
		$interval = $meetingDate->diff($today);
		if($interval->days != 0)
		{
			$data["status"] = "dateError";
			return $data;
		}
		$data["interval"] = $interval->days;
		
		$saveMeetingStatement = $db->prepare("INSERT INTO customermeeting(customerId,customerContactId,customerRepresentativeId,topic,description,
			meetingDate,meetingType,fairId)
			VALUES(?,?,?,?,?,?,?,?)");
		$saveMeetingStatement->bind_param("dddsssdd",$postArray["customerId"],$postArray["customerContactId"],$meridyen->user->userId,
			$postArray["title"], $postArray["description"], $dateMerged, $postArray["meetingType"], 
			$postArray["fairId"]);
		
		if($postArray["meetingType"] == 0)
			$lockDate = 21;
		else
			$lockDate = 30;
		
		if($saveMeetingStatement->execute())
		{
			$saveLockStatement = $db->prepare("INSERT INTO customerlock(customerId,untilDate,userId,lockType) VALUES(?,ADDDATE(?, ?),?,?)");
			$saveLockStatement->bind_param("dsddd",$postArray["customerId"],$dateMerged, $lockDate, $meridyen->user->userId, $postArray["meetingType"]);
			$saveLockStatement->execute();
			//$data["lock"] = mysqli_stmt_error($saveLockStatement);
			$saveLockStatement->close();
			$data["status"] = "Ok";
			$saveMeetingStatement->free_result();
		}
		$saveMeetingStatement->close();
		$data["accessLevel"] = $meridyen->user->accessLevel;
		return $data;
	}
}