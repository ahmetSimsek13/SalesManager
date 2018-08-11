<?php
class suMainScreen extends meridyen_plugin
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
			<div id="suMainScreenDiv">
				<div id="suMainScreen_accordion">
					<h3>Müşteri</h3>
					<div id="suMainScreen_aramaAccordionDiv" style="overflow: hidden;">
						<div id="suMainScreen_aramaTabs">
							<ul>
								<li style="margin-left:330px;"><a href="#suMainScreen_musteriAramaTab">Müşteri Arama</a></li>
								<li><a href="#suMainScreen_musteriDetaylariTab">Müşteri Detayları</a></li>
								<li style="margin-right:330px;"><a href="#suMainScreen_mtFirmaAramaTab">MT - Firma Arama</a></li>
							</ul>
							<div id="suMainScreen_musteriAramaTab">
								<div id="suMainScreen_musteriAramaDiv">
									<div id="suMainScreen_musteriAramaContainerDiv">
										<div id="suMainScreen_musteriAramaLeftDiv">
											<div class="suMainScreen_musteriAramaRow">
												<label>Şirket Ünvanı:</label>
												<input type="text" id="suMainScreen_musteriAramaSirketUnvaniInput"/>
											</div>
											<div class="suMainScreen_musteriAramaRow">
												<label>Şirket Tel:</label>
												<input type="text" id="suMainScreen_musteriAramaSirketTelInput"/>
											</div>
											<div class="suMainScreen_musteriAramaRow">
												<label>Şirket Marka:</label>
												<input type="text" id="suMainScreen_musteriAramaSirketMarkaInput"/>
											</div>
											<div class="suMainScreen_musteriAramaRow">
												<label>Çalışan Adı:</label>
												<input type="text" id="suMainScreen_musteriAramaCalisanAdiInput"/>
											</div>
											<div class="suMainScreen_musteriAramaRow">
												<label>Çalışan Soyadı:</label>
												<input type="text" id="suMainScreen_musteriAramaCalisanSoyadiInput"/>
											</div>
										</div>
										<div id="suMainScreen_musteriAramaRightDiv">
											<div class="suMainScreen_musteriAramaRow">
												<label>Adres Ülke:</label>
												<select id="suMainScreen_musteriAramaAdresUlkeSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
											<div class="suMainScreen_musteriAramaRow">
												<label>Adres İl:</label>
												<select type="text" id="suMainScreen_musteriAdresIlSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
										</div>
									</div>
									<div id="suMainScreen_musteriAramaButtonDiv">
										<input id="suMainScreen_musteriAramaSearchButton" type="Submit" value="Ara" onclick="suMainScreen_searchCustomers()"/>
									</div>
								</div>
								<div id="suMainScreen_musteriSonucDiv">
								</div>
							</div>
							<div id="suMainScreen_musteriDetaylariTab">
								<div id="suMainScreen_musteriDetaylariContainerDiv">
								</div>
							</div>
							<div id="suMainScreen_mtFirmaAramaTab">
								<div id="suMainScreen_mtFirmaAramaMainContainerDiv">
									<div id="suMainScreen_mtFirmaAramaContainerDiv">
										<div id="suMainScreen_mtFirmaAramaLeftDiv">
											<div class="suMainScreen_mtFirmaAramaRow">
												<label>Müşteri Temsilcisi:</label>
												<select id="suMainScreen_mtFirmaAramaMTSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
										</div>
										<div id="suMainScreen_mtFirmaAramaRightDiv">
											<div class="suMainScreen_mtFirmaAramaRow">
												<label>Takip Türü:</label>
												<select id="suMainScreen_mtFirmaAramaLockTypeSelect">
													<option value="-1">Seçiniz</option>
													<option value="0">Sözleşme</option>
													<option value="1">Randevu/Görüşme</option>
												</select>
											</div>
										</div>
									</div>
									<div id="suMainScreen_mtFirmaAramaButtonDiv">
										<input id="suMainScreen_mtFirmaAramaSearchButton" type="Submit" value="Ara" onclick="suMainScreen_getMTLockedCustomers()"/>
									</div>
									<div id="suMainScreen_mtFirmaSonucDiv">
									</div>
								</div>
							</div>
						</div>
					</div>
					<h3>Satış</h3>
					<div id="suMainScreen_satisAccordionDiv" style="overflow: hidden;">
						<div id="suMainScreen_satisTabs">
							<ul>
								<li style="margin-left:400px;"><a href="#suMainScreen_satisAramaTab">Satış Arama</a></li>
								<li style="margin-right:400px;"><a href="#suMainScreen_satisDetaylariTab">Satış Detayları</a></li>
							</ul>
							<div id="suMainScreen_satisAramaTab">
								<div id="suMainScreen_satisAramaContainerDiv">
									<div id="suMainScreen_satisAramaLeftDiv">
										<div class="suMainScreen_satisAramaRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="suMainScreen_satisAramaBaslangicTarihiInput"/>
										</div>
										<div class="suMainScreen_satisAramaRow">
											<label>Fuar:</label>
											<select id="suMainScreen_satisAramaFuarSelect">
												<option value="-1">Seçiniz</option>
												<option value="0">Hepsi</option>
											</select>
										</div>
									</div>
									<div id="suMainScreen_satisAramaRightDiv">
										<div class="suMainScreen_satisAramaRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="suMainScreen_satisAramaBitisTarihiInput"/>
										</div>
										<div class="suMainScreen_satisAramaRow">
											<label>MT:</label>
											<select id="suMainScreen_satisAramaMTSelect">
												<option value="-1">Seçiniz</option>
												<option value="0">Hepsi</option>
											</select>
										</div>
									</div>
								</div>
								<div id="suMainScreen_satisAramaButtonDiv">
									<input id="suMainScreen_satisAramaSearchButton" type="Submit" value="Ara" onclick="suMainScreen_searchContracts()"/>
								</div>
								<div id="suMainScreen_satisSonucDiv">
								</div>
								<div id="suMainScreen_satisOzetDiv">
								</div>
							</div>
							<div id="suMainScreen_satisDetaylariTab">
								<div id="suMainScreen_satisDetaylariContainerDiv">
								</div>
							</div>
						</div>
					</div>
					<h3>Görüşme</h3>
					<div id="suMainScreen_gorusmeAccordionDiv" style="overflow: hidden;">
						<div id="suMainScreen_gorusmeAramaContainerDiv">
							<div id="suMainScreen_gorusmeAramaLeftDiv">
								<div class="suMainScreen_gorusmeAramaRow">
									<label>Başlangıç Tarihi:</label>
									<input type="text" id="suMainScreen_gorusmeAramaBaslangicTarihiInput"/>
								</div>
								<div class="suMainScreen_gorusmeAramaRow">
									<label>Fuar:</label>
									<select id="suMainScreen_gorusmeAramaFuarSelect">
										<option value="-1">Seçiniz</option>
										<option value="0">Hepsi</option>
									</select>
								</div>
							</div>
							<div id="suMainScreen_gorusmeAramaRightDiv">
								<div class="suMainScreen_gorusmeAramaRow">
									<label>Bitiş Tarihi:</label>
									<input type="text" id="suMainScreen_gorusmeAramaBitisTarihiInput"/>
								</div>
								<div class="suMainScreen_gorusmeAramaRow">
									<label>MT:</label>
									<select id="suMainScreen_gorusmeAramaMTSelect">
										<option value="-1">Seçiniz</option>
										<option value="0">Hepsi</option>
									</select>
								</div>
							</div>
						</div>
						<div id="suMainScreen_gorusmeAramaButtonDiv">
							<input id="suMainScreen_gorusmeAramaSearchButton" type="Submit" value="Ara" onclick="suMainScreen_searchMeetings()"/>
						</div>
						<div id="suMainScreen_gorusmeSonucDiv">
						</div>
						<div id="suMainScreen_gorusmeOzetDiv">
						</div>
					</div>
					<h3>İstatistikler</h3>
					<div id="suMainScreen_istatistikAccordionDiv" style="overflow: hidden;">
						<div id="suMainScreen_istatistikTabs">
							<ul>
								<li style="margin-left:330px;"><a href="#suMainScreen_firmaIstatistikTab">Firma Bazlı</a></li>
								<li><a href="#suMainScreen_mtIstatistikTab">MT Bazlı</a></li>
								<li><a href="#suMainScreen_fuarIstatistikTab">Fuar Bazlı</a></li>
								<li style="margin-right:330px;"><a href="#suMainScreen_grupIstatistikTab">Grup Bazlı</a></li>
							</ul>
							<div id="suMainScreen_firmaIstatistikTab">
								<div id="suMainScreen_firmaIstatistikContainerDiv">
									<div id="suMainScreen_firmaIstatistikLeftDiv">
										<div class="suMainScreen_firmaIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="suMainScreen_firmaIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="suMainScreen_firmaIstatistikRow">
											<label>Firma:</label>
											<select id="suMainScreen_firmaIstatistikFirmaSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="suMainScreen_firmaIstatistikRightDiv">
										<div class="suMainScreen_firmaIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="suMainScreen_firmaIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="suMainScreen_firmaIstatistikButtonDiv">
									<input id="suMainScreen_firmaIstatistikSearchButton" type="Submit" value="Oluştur" onclick="suMainScreen_createCustomerStats()"/>
								</div>
								<div id="suMainScreen_firmaIstatistikSonucDiv">
									<div class="suMainScreen_firmaIstatistikSonucRow">
										<div class="suMainScreen_firmaIstatistikChartDiv" id="suMainScreen_firmaIstatistikTypeChart">
										</div>
										<div class="suMainScreen_firmaIstatistikChartDiv" id="suMainScreen_firmaIstatistikSatisM2Chart">
										</div>
										<div class="suMainScreen_firmaIstatistikChartDiv" id="suMainScreen_firmaIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="suMainScreen_firmaIstatistikSonucRow">
										<div class="suMainScreen_firmaIstatistikChartDiv" id="suMainScreen_firmaIstatistikIndirimTutarChart">
										</div>
										<div class="suMainScreen_firmaIstatistikChartDiv" id="suMainScreen_firmaIstatistikIptalSatisM2Chart">
										</div>
										<div class="suMainScreen_firmaIstatistikChartDiv" id="suMainScreen_firmaIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="suMainScreen_firmaIstatistikOzetDiv">
								</div>
							</div>
							<div id="suMainScreen_mtIstatistikTab">
								<div id="suMainScreen_mtIstatistikContainerDiv">
									<div id="suMainScreen_mtIstatistikLeftDiv">
										<div class="suMainScreen_mtIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="suMainScreen_mtIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="suMainScreen_mtIstatistikRow">
											<label>MT:</label>
											<select id="suMainScreen_mtIstatistikMTSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="suMainScreen_mtIstatistikRightDiv">
										<div class="suMainScreen_mtIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="suMainScreen_mtIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="suMainScreen_mtIstatistikButtonDiv">
									<input id="suMainScreen_mtIstatistikSearchButton" type="Submit" value="Oluştur" onclick="suMainScreen_createMTStats()"/>
								</div>
								<div id="suMainScreen_mtIstatistikSonucDiv">
									<div class="suMainScreen_mtIstatistikSonucRow">
										<div class="suMainScreen_mtIstatistikChartDiv" id="suMainScreen_mtIstatistikTypeChart">
										</div>
										<div class="suMainScreen_mtIstatistikChartDiv" id="suMainScreen_mtIstatistikSatisM2Chart">
										</div>
										<div class="suMainScreen_mtIstatistikChartDiv" id="suMainScreen_mtIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="suMainScreen_mtIstatistikSonucRow">
										<div class="suMainScreen_mtIstatistikChartDiv" id="suMainScreen_mtIstatistikIndirimTutarChart">
										</div>
										<div class="suMainScreen_mtIstatistikChartDiv" id="suMainScreen_mtIstatistikIptalSatisM2Chart">
										</div>
										<div class="suMainScreen_mtIstatistikChartDiv" id="suMainScreen_mtIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="suMainScreen_mtIstatistikOzetDiv">
								</div>
							</div>
							<div id="suMainScreen_fuarIstatistikTab">
								<div id="suMainScreen_fuarIstatistikContainerDiv">
									<div id="suMainScreen_fuarIstatistikLeftDiv">
										<div class="suMainScreen_fuarIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="suMainScreen_fuarIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="suMainScreen_fuarIstatistikRow">
											<label>fuar:</label>
											<select id="suMainScreen_fuarIstatistikFuarSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="suMainScreen_fuarIstatistikRightDiv">
										<div class="suMainScreen_fuarIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="suMainScreen_fuarIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="suMainScreen_fuarIstatistikButtonDiv">
									<input id="suMainScreen_fuarIstatistikSearchButton" type="Submit" value="Oluştur" onclick="suMainScreen_createFairStats()"/>
								</div>
								<div id="suMainScreen_fuarIstatistikSonucDiv">
									<div class="suMainScreen_fuarIstatistikSonucRow">
										<div class="suMainScreen_fuarIstatistikChartDiv" id="suMainScreen_fuarIstatistikTypeChart">
										</div>
										<div class="suMainScreen_fuarIstatistikChartDiv" id="suMainScreen_fuarIstatistikSatisM2Chart">
										</div>
										<div class="suMainScreen_fuarIstatistikChartDiv" id="suMainScreen_fuarIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="suMainScreen_fuarIstatistikSonucRow">
										<div class="suMainScreen_fuarIstatistikChartDiv" id="suMainScreen_fuarIstatistikIndirimTutarChart">
										</div>
										<div class="suMainScreen_fuarIstatistikChartDiv" id="suMainScreen_fuarIstatistikIptalSatisM2Chart">
										</div>
										<div class="suMainScreen_fuarIstatistikChartDiv" id="suMainScreen_fuarIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="suMainScreen_fuarIstatistikOzetDiv">
								</div>
							</div>
							<div id="suMainScreen_grupIstatistikTab">
								<div id="suMainScreen_grupIstatistikContainerDiv">
									<div id="suMainScreen_grupIstatistikLeftDiv">
										<div class="suMainScreen_grupIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="suMainScreen_grupIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="suMainScreen_grupIstatistikRow">
											<label>Grup:</label>
											<select id="suMainScreen_grupIstatistikGrupSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="suMainScreen_grupIstatistikRightDiv">
										<div class="suMainScreen_grupIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="suMainScreen_grupIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="suMainScreen_grupIstatistikButtonDiv">
									<input id="suMainScreen_grupIstatistikSearchButton" type="Submit" value="Oluştur" onclick="suMainScreen_createGroupStats()"/>
								</div>
								<div id="suMainScreen_grupIstatistikSonucDiv">
									<div class="suMainScreen_grupIstatistikSonucRow">
										<div class="suMainScreen_grupIstatistikChartDiv" id="suMainScreen_grupIstatistikTypeChart">
										</div>
										<div class="suMainScreen_grupIstatistikChartDiv" id="suMainScreen_grupIstatistikSatisM2Chart">
										</div>
										<div class="suMainScreen_grupIstatistikChartDiv" id="suMainScreen_grupIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="suMainScreen_grupIstatistikSonucRow">
										<div class="suMainScreen_grupIstatistikChartDiv" id="suMainScreen_grupIstatistikIndirimTutarChart">
										</div>
										<div class="suMainScreen_grupIstatistikChartDiv" id="suMainScreen_grupIstatistikIptalSatisM2Chart">
										</div>
										<div class="suMainScreen_grupIstatistikChartDiv" id="suMainScreen_grupIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="suMainScreen_grupIstatistikOzetDiv">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		';
	}
	
	public function getScript()
	{
		$this->scriptList[] = "plugins/suMainScreen/suMainScreen.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/suMainScreen/suMainScreen.css";
		return $this->cssList;
	}
	
	public static function getFairs($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$getFairsStatement = $db->prepare("SELECT fairId,name FROM fair ORDER BY startDate DESC");
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
		$getUsersStatement = $db->prepare("SELECT userId,name,surname FROM users WHERE accessLevel!=3 AND active=1");
		if($getUsersStatement->execute())
		{
			$data["customerRepresentatives"] = array();
			$data["status"] = "Ok";
			$getUsersStatement->store_result();
			$getUsersStatement->bind_result($userId, $name, $surname);
			while($getUsersStatement->fetch())
			{
				$data["customerRepresentatives"][] = array("userId" => $userId, "name" => ($name . " " . $surname));
			}
			$getUsersStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$getUsersStatement->close();
		return $data;
	}

	public static function searchCustomers($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=1 AND ";
		
		$conditionString = "";
		
		$conditionString .= " c.title LIKE CONCAT('%', ?, '%')";
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
		$searchCustomersStatement->bind_param("sssss", $postArray["title"], $postArray["phoneNumber"], $postArray["brand"],
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
			AND c.contractDate <= ? AND c.confirmed = 1 AND c. cancelled = 0";
		if($postArray["fairId"] != 0)
			$queryString .= " AND c.fairId=?";
		if($postArray["userId"] != 0)
			$queryString .= " AND c.customerRepresentativeId=?";
		$queryString .= " ORDER BY c.contractDate DESC";
		
		$searchContractsStatement = $db->prepare($queryString);
		if($postArray["fairId"] == 0 && $postArray["userId"] == 0)
		{
			$searchContractsStatement->bind_param("ss", $startDateMerged, $endDateMerged);
		}
		else if($postArray["fairId"] == 0)
		{
			$searchContractsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $postArray["userId"]);
		}
		else if($postArray["userId"] == 0)
		{
			$searchContractsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $postArray["fairId"]);
		}
		else
		{
			$searchContractsStatement->bind_param("ssdd", $startDateMerged, $endDateMerged, $postArray["fairId"], $postArray["userId"]);
		}
		
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

	public static function getContractDetails($meridyen, $contractId)
	{
		$data = array();
		$db = $meridyen->db;
		$getContractInformation = $db->prepare("SELECT fairId, customerRepresentativeId, customerId, productGroup, shippingOption, standRequest,
			standArea, unitPrice, contractAmount, discountRate, discountAmount, kdvAmount, contractAmountWithKdv, extraCommitments,
			customerContactId,contractDate, extraNavlun, extraNavlunArea, extraNavlunPrice,pdfUploaded FROM contract WHERE contractId=?");
		$getContractInformation->bind_param("d",$contractId);
		
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
			AND c.meetingDate <= ?";
		
		if($postArray["fairId"] != 0)
			$queryString .= " AND c.fairId=?";
		if($postArray["userId"] != 0)
			$queryString .= " AND c.customerRepresentativeId=?";
		$queryString .= " ORDER BY c.meetingDate DESC";
		
		$searchMeetingsStatement = $db->prepare($queryString);
		
		if($postArray["fairId"] == 0 && $postArray["userId"] == 0)
		{
			$searchMeetingsStatement->bind_param("ss", $startDateMerged, $endDateMerged);
		}
		else if($postArray["fairId"] == 0)
		{
			$searchMeetingsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $postArray["userId"]);
		}
		else if($postArray["userId"] == 0)
		{
			$searchMeetingsStatement->bind_param("ssd", $startDateMerged, $endDateMerged, $postArray["fairId"]);
		}
		else
		{
			$searchMeetingsStatement->bind_param("ssdd", $startDateMerged, $endDateMerged, $postArray["fairId"], $postArray["userId"]);
		}
		
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
					, "customerTitle" => $customerTitle, "fairName" => $fairName, "mtName" => ($mtName . " " . $mtSurname));
			}
			$searchMeetingsStatement->free_result();
		}
		$searchMeetingsStatement->close();
		return $data;
	}

}