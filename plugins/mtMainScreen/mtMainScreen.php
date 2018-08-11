<?php
class mtMainScreen extends meridyen_plugin
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
			<div id="mtMainScreenDiv">
				<div id="mtMainScreen_accordion">
					<h3>Müşteri</h3>
					<div id="mtMainScreen_aramaAccordionDiv" style="overflow: hidden;">
						<div id="mtMainScreen_aramaTabs">
							<ul>
								<li style="margin-left:200px;"><a href="#mtMainScreen_musteriAramaTab">Müşteri Arama</a></li>
								<li><a href="#mtMainScreen_yeniMusteriKayitTab">Yeni Müşteri Kayıt</a></li>
								<li><a href="#mtMainScreen_firmalarimTab">Firmalarım</a></li>
								<li><a href="#mtMainScreen_fuarlarKatilimcilarTab">Fuarlar ve Katılımcılar</a></li>
								<li style="margin-right:200px;"><a href="#mtMainScreen_musteriDetaylariTab">Müşteri Detayları</a></li>
							</ul>
							<div id="mtMainScreen_musteriAramaTab">
								<div id="mtMainScreen_musteriAramaDiv">
									<div id="mtMainScreen_musteriAramaContainerDiv">
										<div id="mtMainScreen_musteriAramaLeftDiv">
											<div class="mtMainScreen_musteriAramaRow">
												<label>Şirket Ünvanı:</label>
												<input type="text" id="mtMainScreen_musteriAramaSirketUnvaniInput"/>
											</div>
											<div class="mtMainScreen_musteriAramaRow">
												<label>Şirket Tel:</label>
												<input type="text" id="mtMainScreen_musteriAramaSirketTelInput"/>
											</div>
											<div class="mtMainScreen_musteriAramaRow">
												<label>Şirket Marka:</label>
												<input type="text" id="mtMainScreen_musteriAramaSirketMarkaInput"/>
											</div>
											<div class="mtMainScreen_musteriAramaRow">
												<label>Çalışan Adı:</label>
												<input type="text" id="mtMainScreen_musteriAramaCalisanAdiInput"/>
											</div>
											<div class="mtMainScreen_musteriAramaRow">
												<label>Çalışan Soyadı:</label>
												<input type="text" id="mtMainScreen_musteriAramaCalisanSoyadiInput"/>
											</div>
										</div>
										<div id="mtMainScreen_musteriAramaRightDiv">
											<div class="mtMainScreen_musteriAramaRow">
												<label>Adres Ülke:</label>
												<select id="mtMainScreen_musteriAramaAdresUlkeSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
											<div class="mtMainScreen_musteriAramaRow">
												<label>Adres İl:</label>
												<select type="text" id="mtMainScreen_musteriAdresIlSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
										</div>
									</div>
									<div id="mtMainScreen_musteriAramaButtonDiv">
										<input id="mtMainScreen_musteriAramaSearchButton" type="Submit" value="Ara" onclick="mtMainScreen_searchCustomers()"/>
									</div>
								</div>
								<div id="mtMainScreen_musteriSonucDiv">
								</div>
							</div>
							<div id="mtMainScreen_yeniMusteriKayitTab">
								<div id="mtMainScreen_yeniMusteriKayitContainerDiv">
									<div id="mtMainScreen_yeniMusteriKayitLeftDiv">
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Ünvan*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitUnvanInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Marka*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitMarkaInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Vergi Dairesi:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitVergiDairesiInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Vergi No:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitVergiNoInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Sektör*:</label>
											<select id="mtMainScreen_yeniMusteriKayitSektorSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div style="height:35px;" class="mtMainScreen_yeniMusteriKayitRow">
											<label>Şirket Sahibi - İsim*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitSirketSahibiIsimInput"/>
										</div>
										<div style="height:35px;" class="mtMainScreen_yeniMusteriKayitRow">
											<label>Şirket Sahibi - Soyisim*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput"/>
										</div>
										<div style="height:35px;" class="mtMainScreen_yeniMusteriKayitRow" style="height:35px;">
											<label>İrtibat Kurulacak Kişi - İsim*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput"/>
										</div>
										<div style="height:35px;" class="mtMainScreen_yeniMusteriKayitRow" style="height:35px;">
											<label>İrtibat Kurulacak Kişi - Soyisim*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput"/>
										</div>
										<div style="height:35px;" class="mtMainScreen_yeniMusteriKayitRow" style="height:35px;">
											<label>İrtibat Kurulacak Kişi - Telefon*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput"/>
										</div>
									</div>
									<div id="mtMainScreen_yeniMusteriKayitRightDiv">
										<div class="mtMainScreen_musteriAramaRow">
											<span style="font-weight:bold;font-size:13px;">Merkez Bilgileri</span>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Adres*:</label>
											<textarea id="mtMainScreen_yeniMusteriKayitAdresInput"></textarea>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>İlçe*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitIlceInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Şehir*:</label>
											<select id="mtMainScreen_yeniMusteriKayitSehirSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Ülke*:</label>
											<select id="mtMainScreen_yeniMusteriKayitUlkeSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Web*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitWebInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>E-mail*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitEmailInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Tel1*:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitTel1Input"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Tel2:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitTel2Input"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Tel3:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitTel3Input"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Faks:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitFaksInput"/>
										</div>
										<div class="mtMainScreen_yeniMusteriKayitRow">
											<label>Notlar:</label>
											<input type="text" id="mtMainScreen_yeniMusteriKayitNotlarInput"/>
										</div>
									</div>
								</div>
								<div id="mtMainScreen_yeniMusteriKayitButtonDiv">
									<input id="mtMainScreen_yeniMusteriKayitSaveButton" type="Submit" value="Kaydet" onclick="mtMainScreen_saveNewCustomer()"/>
								</div>
							</div>
							<div id="mtMainScreen_firmalarimTab">
								<div id="mtMainScreen_firmalarimContainerDiv">
									<div id="mtMainScreen_firmalarimAccordion">
										<h3>Sözleşmeli Firmalar</h3>
										<div id="mtMainScreen_firmalarimSozlesmeliSonucDiv">
										</div>
										<h3>Takip Edilen Firmalar</h3>
										<div id="mtMainScreen_firmalarimTakipSonucDiv">
										</div>
									</div>
								</div>
							</div>
							<div id="mtMainScreen_musteriDetaylariTab">
								<div id="mtMainScreen_musteriDetaylariContainerDiv">
								</div>
							</div>
							<div id="mtMainScreen_fuarlarKatilimcilarTab">
								<div id="mtMainScreen_fuarlarVeKatilimcilarContainerDiv">
									<div id="mtMainScreen_fuarKatilimciAramaContainerDiv">
										<div class="mtMainScreen_fuarKatilimciAramaRow">
											<label>Fuar:</label>
											<select id="mtMainScreen_fuarKatilimciAramaFuarSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div id="mtMainScreen_fuarKatilimciAramaButtonDiv">
											<input id="mtMainScreen_fuarKatilimciAramaSearchButton" type="Submit" value="Ara" onclick="mtMainScreen_searchFairCustomers()"/>
										</div>
										<div id="mtMainScreen_fuarKatilimciSonucDiv">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h3>Satış</h3>
					<div id="mtMainScreen_satisAccordionDiv" style="overflow: hidden;">
						<div id="mtMainScreen_satisTabs">
							<ul>
								<li style="margin-left:400px;"><a href="#mtMainScreen_satisAramaTab">Satış Arama</a></li>
								<li style="margin-right:400px;"><a href="#mtMainScreen_satisDetaylariTab">Satış Detayları</a></li>
							</ul>
							<div id="mtMainScreen_satisAramaTab">
								<div id="mtMainScreen_satisAramaContainerDiv">
									<div id="mtMainScreen_satisAramaLeftDiv">
										<div class="mtMainScreen_satisAramaRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="mtMainScreen_satisAramaBaslangicTarihiInput"/>
										</div>
										<div class="mtMainScreen_satisAramaRow">
											<label>Fuar:</label>
											<select id="mtMainScreen_satisAramaFuarSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="mtMainScreen_satisAramaRightDiv">
										<div class="mtMainScreen_satisAramaRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="mtMainScreen_satisAramaBitisTarihiInput"/>
										</div>
										<div class="mtMainScreen_satisAramaRow">
											<label>MT:</label>
											<select id="mtMainScreen_satisAramaMTSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
								</div>
								<div id="mtMainScreen_satisAramaButtonDiv">
									<input id="mtMainScreen_satisAramaSearchButton" type="Submit" value="Ara" onclick="mtMainScreen_searchContracts()"/>
								</div>
								<div id="mtMainScreen_satisSonucDiv">
								</div>
								<div id="mtMainScreen_satisOzetDiv">
								</div>
							</div>
							<div id="mtMainScreen_satisDetaylariTab">
								<div id="mtMainScreen_satisDetaylariContainerDiv">
								</div>
							</div>
						</div>
					</div>
					<h3>Görüşme</h3>
					<div id="mtMainScreen_gorusmeAccordionDiv" style="overflow: hidden;">
						<div id="mtMainScreen_gorusmeAramaContainerDiv">
							<div id="mtMainScreen_gorusmeAramaLeftDiv">
								<div class="mtMainScreen_gorusmeAramaRow">
									<label>Başlangıç Tarihi:</label>
									<input type="text" id="mtMainScreen_gorusmeAramaBaslangicTarihiInput"/>
								</div>
								<div class="mtMainScreen_gorusmeAramaRow">
									<label>Fuar:</label>
									<select id="mtMainScreen_gorusmeAramaFuarSelect">
										<option value="-1">Seçiniz</option>
									</select>
								</div>
							</div>
							<div id="mtMainScreen_gorusmeAramaRightDiv">
								<div class="mtMainScreen_gorusmeAramaRow">
									<label>Bitiş Tarihi:</label>
									<input type="text" id="mtMainScreen_gorusmeAramaBitisTarihiInput"/>
								</div>
								<div class="mtMainScreen_gorusmeAramaRow">
									<label>MT:</label>
									<select id="mtMainScreen_gorusmeAramaMTSelect">
										<option value="-1">Seçiniz</option>
									</select>
								</div>
							</div>
						</div>
						<div id="mtMainScreen_gorusmeAramaButtonDiv">
							<input id="mtMainScreen_gorusmeAramaSearchButton" type="Submit" value="Ara" onclick="mtMainScreen_searchMeetings()"/>
						</div>
						<div id="mtMainScreen_gorusmeSonucDiv">
						</div>
						<div id="mtMainScreen_gorusmeOzetDiv">
						</div>
					</div>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/mtMainScreen/mtMainScreen.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/mtMainScreen/mtMainScreen.css";
		return $this->cssList;
	}
	
	public static function getFairs($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
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
		return $data;
	}
	
	public static function getCustomerRepresentatives($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$data["customerRepresentatives"] = array();
		$data["status"] = "Ok";
		$data["customerRepresentatives"][] = array("userId" => $meridyen->user->userId, "name" => ($meridyen->user->name . " " . $meridyen->user->surname));
		return $data;
	}

	public static function saveNewCustomer($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
		
		$getUnvanStatement = $db->prepare("SELECT count(*) FROM customer WHERE ((title LIKE ?) OR (? LIKE CONCAT(title,'%'))) AND customerId IN (SELECT customerId FROM customersectorrelation WHERE sectorId=?)");
		$likeString = $postArray["unvan"] . "%";
		$getUnvanStatement->bind_param("ssd",$likeString,$postArray["unvan"],$postArray["sektorId"]);
		if($getUnvanStatement->execute())
		{
			$data["status"] = "Ok";
			$getUnvanStatement->store_result();
			$getUnvanStatement->bind_result($count);
			$getUnvanStatement->fetch();
			$getUnvanStatement->free_result();
			if($count > 0)
			{
				$data["status"] = "Aynı ünvana sahip başka bir müşteri bulunmuştur.";
				return $data;
			}
		}
		
		$autoIncrementResult = $db->query("SHOW TABLE STATUS LIKE 'customer'");
		$row = $autoIncrementResult->fetch_assoc();
		$nextId = $row['Auto_increment'];
		$autoIncrementResult->free();
		
		$insertCustomerStatement = $db->prepare("INSERT INTO customer(title,brand,taxOffice,taxId,userIdAdded,onay,addedDate)
			VALUES(?,?,?,?,?,0,CURDATE())");
		$insertCustomerStatement->bind_param("ssssd",$postArray["unvan"],$postArray["marka"],$postArray["vergiDairesi"],$postArray["vergiNo"]
			,$meridyen->user->userId);
		
		if($insertCustomerStatement->execute())
		{
			$insertCustomerSectorStatement = $db->prepare("INSERT INTO customersectorrelation(customerId,sectorId) VALUES(?,?)");
			$insertCustomerSectorStatement->bind_param("dd",$nextId, $postArray["sektorId"]);
			if($insertCustomerSectorStatement->execute())
			{
				$insertCustomerSectorStatement->free_result();
				
				$autoIncrementResult2 = $db->query("SHOW TABLE STATUS LIKE 'customerbranch'");
				$row2 = $autoIncrementResult2->fetch_assoc();
				$nextBranchId = $row2['Auto_increment'];
				$autoIncrementResult2->free();
				
				$insertCustomerBranchStatement = $db->prepare("INSERT INTO customerbranch(customerId,type,address,county,cityId,
					countryId,website,email,phoneNumber1, phoneNumber2,phoneNumber3,fax,notes) VALUES(?,'Merkez',?,?,?,?,?,?,?,?,?,?,?)");
				$insertCustomerBranchStatement->bind_param("dssddsssssss",$nextId, $postArray["adres"],$postArray["ilce"],$postArray["sehirId"]
					,$postArray["ulkeId"],$postArray["web"],$postArray["email"],$postArray["tel1"],$postArray["tel2"],$postArray["tel3"],$postArray["faks"]
					,$postArray["notlar"]);
					
				if($insertCustomerBranchStatement->execute())
				{
					$data["status"] = "Ok";
					$insertCustomerBranchStatement->free_result();
					$insertCustomerContactStatement = $db->prepare("INSERT INTO customercontact(customerId,name,surname,title,phone,branchType,emailAddress)
						VALUES(?,?,?,?,?,'Merkez',?)");
					
					$contactTitle = "Şirket Sahibi";
					$contactPhone = NULL;
					$contactEmail = NULL;
					$insertCustomerContactStatement->bind_param("dsssss", $nextId, $postArray["sirketSahibiIsim"], $postArray["sirketSahibiSoyisim"],
						$contactTitle, $contactPhone, $contactEmail);
					$insertCustomerContactStatement->execute();
					
					$contactTitle = NULL;
					$insertCustomerContactStatement->bind_param("dsssss", $nextId, $postArray["irtibatKurulacakKisiIsim"], 
						$postArray["irtibatKurulacakKisiSoyisim"],$contactTitle, $postArray["irtibatKurulacakKisiTel"], $contactEmail);
					$insertCustomerContactStatement->execute();
					
					$insertCustomerContactStatement->close();
				}
				else
					$data["status"] = "brancherror";
				$insertCustomerBranchStatement->close();
			}
			else
				$data["status"] = "sectorError";
 			$insertCustomerSectorStatement->close();
			$insertCustomerStatement->free_result();
		}
		else
		{
			$data["status"] = "customerError";
		}
		$insertCustomerStatement->close();
		return $data;
	}
	
	public static function searchCustomers($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=1 AND c.customerId IN (SELECT customerId FROM customersectorrelation WHERE sectorId=?)";
		
		$conditionString = "";
		
		$conditionString .= " AND c.title LIKE CONCAT('%', ?, '%')";
		$conditionString .= " AND b.phoneNumber1 LIKE CONCAT('%', ?, '%')";
		$conditionString .= " AND c.brand LIKE CONCAT('%', ?, '%')";
		$conditionString .= " AND c.customerId IN (SELECT d.customerId FROM customercontact d WHERE ";
		$conditionString .= " d.name LIKE CONCAT('%', ?, '%') AND d.surname LIKE CONCAT('%', ?, '%'))";
		
		if($postArray["countryId"] != -1)
			$conditionString .= " AND b.countryId=" . $postArray["countryId"];
		
		if($postArray["cityId"] != -1)
			$conditionString .= " AND b.cityId=" . $postArray["cityId"];
		
		$queryString .= $conditionString;
		$queryString .= " ORDER BY c.title";
		$searchCustomersStatement = $db->prepare($queryString);
		$searchCustomersStatement->bind_param("dsssss", $meridyen->user->sectorId, $postArray["title"], $postArray["phoneNumber"], $postArray["brand"],
			$postArray["name"], $postArray["surname"]);
			
		if($searchCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["customers"] = array();
			$searchCustomersStatement->store_result();
			$searchCustomersStatement->bind_result($customerId, $title, $phoneNumber, $website, $email);
			while($searchCustomersStatement->fetch())
			{
				$getCustomerLockStatement = $db->prepare("SELECT c.userId FROM customerlock c, users u WHERE c.untilDate >= curdate() 
					AND c.customerId=? AND c.userId=u.userId ORDER BY c.untilDate DESC");
				$getCustomerLockStatement->bind_param("d",$customerId);
				$getCustomerLockStatement->execute();
				$getCustomerLockStatement->store_result();
				$locked = false; 
				$numRows = $getCustomerLockStatement->num_rows;
				if($numRows != 0)
				{
					$locked = true;
				}
				$data["customers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "website" => $website, "email" => $email, "locked" => $locked);
			}
			$searchCustomersStatement->free_result();
		}
		$searchCustomersStatement->close();
		return $data;
	}
	
	public static function searchContracts($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$startDateInput = $postArray["startDate"];
		$startDateSplitted = explode("/",$startDateInput);
		$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
		$endDateInput = $postArray["endDate"];
		$endDateSplitted = explode("/",$endDateInput);
		$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
		$queryString = "SELECT c.contractId,c.contractDate, b.title, f.name, c.standArea FROM contract c, fair f, customer b
			WHERE b.customerId = c.customerId AND f.fairId = c.fairId AND c.contractDate >= ? 
			AND c.contractDate <= ? AND c.fairId=? AND c.customerRepresentativeId=? AND c.confirmed = 1 AND c. cancelled = 0 ORDER BY c.contractDate DESC";
		
		$searchContractsStatement = $db->prepare($queryString);
		$searchContractsStatement->bind_param("ssdd", $startDateMerged, $endDateMerged, $postArray["fairId"], $postArray["userId"]);
			
		if($searchContractsStatement->execute())
		{
			$data["status"] = "Ok";
			$data["contracts"] = array();
			$searchContractsStatement->store_result();
			$searchContractsStatement->bind_result($contractId, $contractDate, $title, $fairName, $standArea);
			while($searchContractsStatement->fetch())
			{
				$contractDateSplitted = explode("-",$contractDate);
				$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
				$data["contracts"][] = array("contractId" => $contractId, "contractDate" => $contractDateMerged, "title" => $title, "fairName" => $fairName
					, "standArea" => $standArea);
			}
			$searchContractsStatement->free_result();
		}
		$searchContractsStatement->close();
		return $data;
	}

	public static function searchMeetings($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$startDateInput = $postArray["startDate"];
		$startDateSplitted = explode("/",$startDateInput);
		$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
		$endDateInput = $postArray["endDate"];
		$endDateSplitted = explode("/",$endDateInput);
		$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
		$queryString = "SELECT c.meetingId, c.topic, c.description, c.meetingDate, c.meetingType, b.title, f.name, u.name, u.surname
			FROM customermeeting c, fair f, customer b, users u
			WHERE b.customerId = c.customerId AND f.fairId = c.fairId AND u.userId = c.customerRepresentativeId AND c.meetingDate >= ? 
			AND c.meetingDate <= ? AND c.fairId=? AND c.customerRepresentativeId=? ORDER BY c.meetingDate DESC";
		
		$searchMeetingsStatement = $db->prepare($queryString);
		$searchMeetingsStatement->bind_param("ssdd", $startDateMerged, $endDateMerged, $postArray["fairId"], $postArray["userId"]);
			
		if($searchMeetingsStatement->execute())
		{
			$data["status"] = "Ok";
			$data["meetings"] = array();
			$searchMeetingsStatement->store_result();
			$searchMeetingsStatement->bind_result($meetingId, $topic, $description, $meetingDate, $meetingType, $customerTitle, $fairName,
				$mtName, $mtSurname);
			while($searchMeetingsStatement->fetch())
			{
				$meetingDateSplitted = explode("-",$meetingDate);
				$meetingDateMerged = $meetingDateSplitted[2] . "/" . $meetingDateSplitted[1] . "/" . $meetingDateSplitted[0];
				
				if($meetingType == 0)
					$meetingType = "Görüşme";
				else
					$meetingType = "Randevu";
				
				$data["meetings"][] = array("meetingId" => $meetingId, "topic" => $topic, "description" => $description, "meetingDate" => $meetingDateMerged
					, "customerTitle" => $customerTitle, "fairName" => $fairName, "mtName" => ($mtName . " " . $mtSurname), "meetingType" => $meetingType);
			}
			$searchMeetingsStatement->free_result();
		}
		$searchMeetingsStatement->close();
		return $data;
	}

	public static function searchCustomerMeetings($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.meetingId, c.topic, c.description, c.meetingDate, c.meetingType, b.title, f.name, u.name, u.surname
			FROM customermeeting c, fair f, customer b, users u
			WHERE b.customerId = c.customerId AND f.fairId = c.fairId AND u.userId = c.customerRepresentativeId AND c.customerId=?
			ORDER BY c.meetingDate DESC";
		
		$searchCustomerMeetingsStatement = $db->prepare($queryString);
		$searchCustomerMeetingsStatement->bind_param("d", $postArray["customerId"]);
			
		if($searchCustomerMeetingsStatement->execute())
		{
			$data["status"] = "Ok";
			$data["meetings"] = array();
			$searchCustomerMeetingsStatement->store_result();
			$searchCustomerMeetingsStatement->bind_result($meetingId, $topic, $description, $meetingDate, $meetingType, $customerTitle, $fairName,
				$mtName, $mtSurname);
			while($searchCustomerMeetingsStatement->fetch())
			{
				$meetingDateSplitted = explode("-",$meetingDate);
				$meetingDateMerged = $meetingDateSplitted[2] . "/" . $meetingDateSplitted[1] . "/" . $meetingDateSplitted[0];
				
				if($meetingType == 0)
					$meetingType = "Görüşme";
				else
					$meetingType = "Randevu";
				
				$data["meetings"][] = array("meetingId" => $meetingId, "topic" => $topic, "description" => $description, "meetingDate" => $meetingDateMerged
					, "customerTitle" => $customerTitle, "fairName" => $fairName, "mtName" => ($mtName . " " . $mtSurname), "meetingType" => $meetingType);
			}
			$searchCustomerMeetingsStatement->free_result();
		}
		$searchCustomerMeetingsStatement->close();
		return $data;
	}

	public static function searchCustomerContracts($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.contractId,c.contractDate, b.title, f.name, c.standArea FROM contract c, fair f, customer b
			WHERE b.customerId = c.customerId AND f.fairId = c.fairId AND c.customerId=? AND c.customerRepresentativeId=? AND c.confirmed = 1 AND c. cancelled = 0 ORDER BY c.contractDate DESC";
		
		$searchCustomerContractsStatement = $db->prepare($queryString);
		$searchCustomerContractsStatement->bind_param("dd", $postArray["customerId"], $meridyen->user->userId);
			
		if($searchCustomerContractsStatement->execute())
		{
			$data["status"] = "Ok";
			$data["contracts"] = array();
			$searchCustomerContractsStatement->store_result();
			$searchCustomerContractsStatement->bind_result($contractId, $contractDate, $title, $fairName, $standArea);
			while($searchCustomerContractsStatement->fetch())
			{
				$contractDateSplitted = explode("-",$contractDate);
				$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
				$data["contracts"][] = array("contractId" => $contractId, "contractDate" => $contractDateMerged, "title" => $title, "fairName" => $fairName
					, "standArea" => $standArea);
			}
			$searchCustomerContractsStatement->free_result();
		}
		$searchCustomerContractsStatement->close();
		return $data;
	}
	
	public static function getContractDetails($meridyen, $contractId)
	{
		$data = array();
		$db = $meridyen->db;
		$getContractInformation = $db->prepare("SELECT fairId, customerRepresentativeId, customerId, productGroup, shippingOption, standRequest,
			standArea, unitPrice, contractAmount, discountRate, discountAmount, kdvAmount, contractAmountWithKdv, extraCommitments,
			customerContactId,contractDate, extraNavlun, extraNavlunArea, extraNavlunPrice, pdfUploaded FROM contract WHERE contractId=? AND customerRepresentativeId=?");
		$getContractInformation->bind_param("dd",$contractId, $meridyen->user->userId);
		
		if($getContractInformation->execute())
		{
			$data["status"] = "Ok";
			$getContractInformation->store_result();
			$getContractInformation->bind_result($fairId, $customerRepresentativeId, $customerId, $productGroup, $shippingOption, $standRequest,
				$standArea, $unitPrice, $contractAmount, $discountRate, $discountAmount, $kdvAmount,$contractAmountWithKdv, $extraCommitments,
				$customerContactId, $contractDate, $extraNavlun, $extraNavlunArea, $extraNavlunPrice, $pdfUploaded);
			$getContractInformation->fetch();
			$contractDateSplitted = explode("-",$contractDate);
			$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
			
			if($extraNavlun == 0)
				$extraNavlun = false;
			else
				$extraNavlun = true;
			
			if($shippingOption == 0)
			{
				$shippingOption = "Nakliyesiz";
			}
			else
			{
				$shippingOption = "Nakliyeli";
			}	
			
			if($standRequest == 0)
			{
				$standRequest = "Standsız";
			}
			else
			{
				$standRequest = "Standlı";
			}
			
			$pdfUpload = false;
			if($pdfUploaded == 1)
			{
				$pdfUpload = true;
			}
			
			$data["generalInfo"] = array("productGroup" => $productGroup, "shippingOption" => $shippingOption, "standRequest" => $standRequest
				, "standArea" => $standArea, "unitPrice" => $unitPrice, "contractAmount" => $contractAmount, "discountRate" => $discountRate
				, "discountAmount" => $discountAmount, "kdvAmount" => $kdvAmount, "contractAmountWithKdv" => $contractAmountWithKdv
				, "extraCommitments" => $extraCommitments, "contractDate" => $contractDateMerged, "extraNavlun" => $extraNavlun
				, "extraNavlunArea" => $extraNavlunArea, "extraNavlunPrice" => $extraNavlunPrice, "pdfUpload" => $pdfUpload);
			$getContractInformation->free_result();
			
			$getFairInfoStatement = $db->prepare("SELECT f.name,f.price,f.customerRepresentative,f.startDate,f.endDate FROM fair f 
				WHERE f.fairId=?");
			$getFairInfoStatement->bind_param("d",$fairId);
			$getFairInfoStatement->execute();
			$getFairInfoStatement->store_result();
			$getFairInfoStatement->bind_result($fairName, $price, $customerRepresentative, $startDate, $endDate);
			$getFairInfoStatement->fetch();
			
			$startDateSplitted = explode("-",$startDate);
			$startDateMerged = $startDateSplitted[2] . "/" . $startDateSplitted[1] . "/" . $startDateSplitted[0];
			
			$endDateSplitted = explode("-",$endDate);
			$endDateMerged = $endDateSplitted[2] . "/" . $endDateSplitted[1] . "/" . $endDateSplitted[0];
			
			$fkName = "";
			$fkSurname = "";
			$getFairKeeperInfoStatement = $db->prepare("SELECT u.name,u.surname FROM fair f, users u
				WHERE f.fairId=? AND f.fairKeeperId=u.userId");
			$getFairKeeperInfoStatement->bind_param("d",$fairId);
			$getFairKeeperInfoStatement->execute();
			$getFairKeeperInfoStatement->store_result();
			$getFairKeeperInfoStatement->bind_result($fkName, $fkSurname);
			$getFairKeeperInfoStatement->fetch();
			$getFairKeeperInfoStatement->free_result();
			$getFairKeeperInfoStatement->close();
			
			$data["fairInfo"] = array("fairName" => $fairName, "price" => $price, "mtName" => ($customerRepresentative)
				, "fkName" => ($fkName . " " . $fkSurname), "startDate" => $startDateMerged, "endDate" => $endDateMerged);
			$getFairInfoStatement->free_result();
			$getFairInfoStatement->close();
			
			$getCustomerInfoStatement = $db->prepare("SELECT title FROM customer WHERE customerId=?");
			$getCustomerInfoStatement->bind_param("d",$customerId);
			$getCustomerInfoStatement->execute();
			$getCustomerInfoStatement->store_result();
			$getCustomerInfoStatement->bind_result($title);
			$getCustomerInfoStatement->fetch();
			
			$data["customerTitle"] = $title;
			$getCustomerInfoStatement->free_result();
			$getCustomerInfoStatement->close();
			
			$getCustomerContactInfoStatement = $db->prepare("SELECT name, surname FROM customercontact WHERE customerContactId=?");
			$getCustomerContactInfoStatement->bind_param("d",$customerContactId);
			$getCustomerContactInfoStatement->execute();
			$getCustomerContactInfoStatement->store_result();
			$getCustomerContactInfoStatement->bind_result($contactName, $contactSurname);
			$getCustomerContactInfoStatement->fetch();
			$data["customerContactName"] = $contactName . " " . $contactSurname;
			$getCustomerContactInfoStatement->free_result();
			$getCustomerContactInfoStatement->close();
			
			$getCustomerRepresentativeInfoStatement = $db->prepare("SELECT u.name, u.surname, s.description FROM users u, sector s WHERE userId=? AND
				u.sectorId=s.sectorId");
			$getCustomerRepresentativeInfoStatement->bind_param("d",$customerRepresentativeId);
			$getCustomerRepresentativeInfoStatement->execute();
			$getCustomerRepresentativeInfoStatement->store_result();
			$getCustomerRepresentativeInfoStatement->bind_result($crName, $crSurname, $description);
			$getCustomerRepresentativeInfoStatement->fetch();
			$data["customerRepresentativeInfo"] = array("name" => ($crName . " " . $crSurname), "sector" => $description);
			$getCustomerRepresentativeInfoStatement->free_result();
			$getCustomerRepresentativeInfoStatement->close();
			
			$getPaymentsStatement = $db->prepare("SELECT amount, dueDate, paid FROM contractpayments WHERE contractId=? ORDER BY paymentOrder ASC");
			$getPaymentsStatement->bind_param("d",$contractId);
			$getPaymentsStatement->execute();
			$getPaymentsStatement->store_result();
			$getPaymentsStatement->bind_result($paymentAmount, $paymentDueDate, $paymentPaid);
			$data["payments"] = array();
			while($getPaymentsStatement->fetch())
			{
				$paymentDueDateSplitted = explode("-",$paymentDueDate);
				$paymentDueDateMerged = $paymentDueDateSplitted[2] . "/" . $paymentDueDateSplitted[1] . "/" . $paymentDueDateSplitted[0];
				
				if($paymentPaid == 1)
					$paymentPaid = true;
				else
					$paymentPaid = false;
					
				$data["payments"][] = array("paymentAmount" => $paymentAmount, "paymentDueDate" => $paymentDueDateMerged, "paymentPaid" => $paymentPaid);
			}
			$getPaymentsStatement->free_result();
			$getPaymentsStatement->close();
		}
		else
			$data["status"] = "Error";
		$getContractInformation->close();
		return $data;
	}
}