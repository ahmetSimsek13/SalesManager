<?php
class flMainScreen extends meridyen_plugin
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
			<div id="flMainScreenDiv">
				<div id="flMainScreen_accordion">
					<h3>Müşteri</h3>
					<div id="flMainScreen_aramaAccordionDiv" style="overflow: hidden;">
						<div id="flMainScreen_aramaTabs">
							<ul>
								<li style="margin-left:216px;"><a href="#flMainScreen_musteriAramaTab">Müşteri Arama</a></li>
								<li><a href="#flMainScreen_yeniMusteriKayitTab">Yeni Müşteri Kayıt</a></li>
								<li><a href="#flMainScreen_firmalarimTab">Firmalarım</a></li>
								<li><a href="#flMainScreen_musteriDetaylariTab">Müşteri Detayları</a></li>
								<li style="margin-right:216px;"><a href="#flMainScreen_mtFirmaAramaTab">MT - Firma Arama</a></li>
							</ul>
							<div id="flMainScreen_musteriAramaTab">
								<div id="flMainScreen_musteriAramaDiv">
									<div id="flMainScreen_musteriAramaContainerDiv">
										<div id="flMainScreen_musteriAramaLeftDiv">
											<div class="flMainScreen_musteriAramaRow">
												<label>Şirket Ünvanı:</label>
												<input type="text" id="flMainScreen_musteriAramaSirketUnvaniInput"/>
											</div>
											<div class="flMainScreen_musteriAramaRow">
												<label>Şirket Tel:</label>
												<input type="text" id="flMainScreen_musteriAramaSirketTelInput"/>
											</div>
											<div class="flMainScreen_musteriAramaRow">
												<label>Şirket Marka:</label>
												<input type="text" id="flMainScreen_musteriAramaSirketMarkaInput"/>
											</div>
											<div class="flMainScreen_musteriAramaRow">
												<label>Çalışan Adı:</label>
												<input type="text" id="flMainScreen_musteriAramaCalisanAdiInput"/>
											</div>
											<div class="flMainScreen_musteriAramaRow">
												<label>Çalışan Soyadı:</label>
												<input type="text" id="flMainScreen_musteriAramaCalisanSoyadiInput"/>
											</div>
										</div>
										<div id="flMainScreen_musteriAramaRightDiv">
											<div class="flMainScreen_musteriAramaRow">
												<label>Adres Ülke:</label>
												<select id="flMainScreen_musteriAramaAdresUlkeSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
											<div class="flMainScreen_musteriAramaRow">
												<label>Adres İl:</label>
												<select type="text" id="flMainScreen_musteriAdresIlSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
										</div>
									</div>
									<div id="flMainScreen_musteriAramaButtonDiv">
										<input id="flMainScreen_musteriAramaSearchButton" type="Submit" value="Ara" onclick="flMainScreen_searchCustomers()"/>
									</div>
								</div>
								<div id="flMainScreen_musteriSonucDiv">
								</div>
							</div>
							<div id="flMainScreen_yeniMusteriKayitTab">
								<div id="flMainScreen_yeniMusteriKayitContainerDiv">
									<div id="flMainScreen_yeniMusteriKayitLeftDiv">
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Ünvan*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitUnvanInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Marka*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitMarkaInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Vergi Dairesi:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitVergiDairesiInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Vergi No:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitVergiNoInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Sektör*:</label>
											<select id="flMainScreen_yeniMusteriKayitSektorSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div style="height:35px;" class="flMainScreen_yeniMusteriKayitRow">
											<label>Şirket Sahibi - İsim*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitSirketSahibiIsimInput"/>
										</div>
										<div style="height:35px;" class="flMainScreen_yeniMusteriKayitRow">
											<label>Şirket Sahibi - Soyisim*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitSirketSahibiSoyisimInput"/>
										</div>
										<div style="height:35px;" class="flMainScreen_yeniMusteriKayitRow" style="height:35px;">
											<label>İrtibat Kurulacak Kişi - İsim*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiIsimInput"/>
										</div>
										<div style="height:35px;" class="flMainScreen_yeniMusteriKayitRow" style="height:35px;">
											<label>İrtibat Kurulacak Kişi - Soyisim*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiSoyisimInput"/>
										</div>
										<div style="height:35px;" class="flMainScreen_yeniMusteriKayitRow" style="height:35px;">
											<label>İrtibat Kurulacak Kişi - Telefon*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitIrtibatKurulacakKisiTelInput"/>
										</div>
									</div>
									<div id="flMainScreen_yeniMusteriKayitRightDiv">
										<div class="flMainScreen_musteriAramaRow">
											<span style="font-weight:bold;font-size:13px;">Merkez Bilgileri</span>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Adres*:</label>
											<textarea id="flMainScreen_yeniMusteriKayitAdresInput"></textarea>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>İlçe*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitIlceInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Şehir*:</label>
											<select id="flMainScreen_yeniMusteriKayitSehirSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Ülke*:</label>
											<select id="flMainScreen_yeniMusteriKayitUlkeSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Web*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitWebInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>E-mail*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitEmailInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Tel1*:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitTel1Input"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Tel2:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitTel2Input"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Tel3:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitTel3Input"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Faks:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitFaksInput"/>
										</div>
										<div class="flMainScreen_yeniMusteriKayitRow">
											<label>Notlar:</label>
											<input type="text" id="flMainScreen_yeniMusteriKayitNotlarInput"/>
										</div>
									</div>
								</div>
								<div id="flMainScreen_yeniMusteriKayitButtonDiv">
									<input id="flMainScreen_yeniMusteriKayitSaveButton" type="Submit" value="Kaydet" onclick="flMainScreen_saveNewCustomer()"/>
								</div>
							</div>
							<div id="flMainScreen_firmalarimTab">
								<div id="flMainScreen_firmalarimContainerDiv">
									<div id="flMainScreen_firmalarimAccordion">
										<h3>Sözleşmeli Firmalar</h3>
										<div id="flMainScreen_firmalarimSozlesmeliSonucDiv">
										</div>
										<h3>Takip Edilen Firmalar</h3>
										<div id="flMainScreen_firmalarimTakipSonucDiv">
										</div>
									</div>
								</div>
							</div>
							<div id="flMainScreen_musteriDetaylariTab">
								<div id="flMainScreen_musteriDetaylariContainerDiv">
								</div>
							</div>
							<div id="flMainScreen_mtFirmaAramaTab">
								<div id="flMainScreen_mtFirmaAramaMainContainerDiv">
									<div id="flMainScreen_mtFirmaAramaContainerDiv">
										<div id="flMainScreen_mtFirmaAramaLeftDiv">
											<div class="flMainScreen_mtFirmaAramaRow">
												<label>Müşteri Temsilcisi:</label>
												<select id="flMainScreen_mtFirmaAramaMTSelect">
													<option value="-1">Seçiniz</option>
												</select>
											</div>
										</div>
										<div id="flMainScreen_mtFirmaAramaRightDiv">
											<div class="flMainScreen_mtFirmaAramaRow">
												<label>Takip Türü:</label>
												<select id="flMainScreen_mtFirmaAramaLockTypeSelect">
													<option value="-1">Seçiniz</option>
													<option value="0">Sözleşme</option>
													<option value="1">Randevu/Görüşme</option>
												</select>
											</div>
										</div>
									</div>
									<div id="flMainScreen_mtFirmaAramaButtonDiv">
										<input id="flMainScreen_mtFirmaAramaSearchButton" type="Submit" value="Ara" onclick="flMainScreen_getMTLockedCustomers()"/>
									</div>
									<div id="flMainScreen_mtFirmaSonucDiv">
									</div>
								</div>
							</div>
						</div>
					</div>
					<h3>Satış</h3>
					<div id="flMainScreen_satisAccordionDiv" style="overflow: hidden;">
						<div id="flMainScreen_satisTabs">
							<ul>
								<li style="margin-left:400px;"><a href="#flMainScreen_satisAramaTab">Satış Arama</a></li>
								<li style="margin-right:400px;"><a href="#flMainScreen_satisDetaylariTab">Satış Detayları</a></li>
							</ul>
							<div id="flMainScreen_satisAramaTab">
								<div id="flMainScreen_satisAramaContainerDiv">
									<div id="flMainScreen_satisAramaLeftDiv">
										<div class="flMainScreen_satisAramaRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="flMainScreen_satisAramaBaslangicTarihiInput"/>
										</div>
										<div class="flMainScreen_satisAramaRow">
											<label>Fuar:</label>
											<select id="flMainScreen_satisAramaFuarSelect">
												<option value="-1">Seçiniz</option>
												<option value="0">Hepsi</option>
											</select>
										</div>
									</div>
									<div id="flMainScreen_satisAramaRightDiv">
										<div class="flMainScreen_satisAramaRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="flMainScreen_satisAramaBitisTarihiInput"/>
										</div>
										<div class="flMainScreen_satisAramaRow">
											<label>MT:</label>
											<select id="flMainScreen_satisAramaMTSelect">
												<option value="-1">Seçiniz</option>
												<option value="0">Hepsi</option>
											</select>
										</div>
									</div>
								</div>
								<div id="flMainScreen_satisAramaButtonDiv">
									<input id="flMainScreen_satisAramaSearchButton" type="Submit" value="Ara" onclick="flMainScreen_searchContracts()"/>
								</div>
								<div id="flMainScreen_satisSonucDiv">
								</div>
								<div id="flMainScreen_satisOzetDiv">
								</div>
							</div>
							<div id="flMainScreen_satisDetaylariTab">
								<div id="flMainScreen_satisDetaylariContainerDiv">
								</div>
							</div>
						</div>
					</div>
					<h3>Görüşme</h3>
					<div id="flMainScreen_gorusmeAccordionDiv" style="overflow: hidden;">
						<div id="flMainScreen_gorusmeAramaContainerDiv">
							<div id="flMainScreen_gorusmeAramaLeftDiv">
								<div class="flMainScreen_gorusmeAramaRow">
									<label>Başlangıç Tarihi:</label>
									<input type="text" id="flMainScreen_gorusmeAramaBaslangicTarihiInput"/>
								</div>
								<div class="flMainScreen_gorusmeAramaRow">
									<label>Fuar:</label>
									<select id="flMainScreen_gorusmeAramaFuarSelect">
										<option value="-1">Seçiniz</option>
										<option value="0">Hepsi</option>
									</select>
								</div>
							</div>
							<div id="flMainScreen_gorusmeAramaRightDiv">
								<div class="flMainScreen_gorusmeAramaRow">
									<label>Bitiş Tarihi:</label>
									<input type="text" id="flMainScreen_gorusmeAramaBitisTarihiInput"/>
								</div>
								<div class="flMainScreen_gorusmeAramaRow">
									<label>MT:</label>
									<select id="flMainScreen_gorusmeAramaMTSelect">
										<option value="-1">Seçiniz</option>
										<option value="0">Hepsi</option>
									</select>
								</div>
							</div>
						</div>
						<div id="flMainScreen_gorusmeAramaButtonDiv">
							<input id="flMainScreen_gorusmeAramaSearchButton" type="Submit" value="Ara" onclick="flMainScreen_searchMeetings()"/>
						</div>
						<div id="flMainScreen_gorusmeSonucDiv">
						</div>
						<div id="flMainScreen_gorusmeOzetDiv">
						</div>
					</div>
					<h3>İstatistikler</h3>
					<div id="flMainScreen_istatistikAccordionDiv" style="overflow: hidden;">
						<div id="flMainScreen_istatistikTabs">
							<ul>
								<li style="margin-left:330px;"><a href="#flMainScreen_firmaIstatistikTab">Firma Bazlı</a></li>
								<li><a href="#flMainScreen_mtIstatistikTab">MT Bazlı</a></li>
								<li><a href="#flMainScreen_fuarIstatistikTab">Fuar Bazlı</a></li>
								<li style="margin-right:330px;"><a href="#flMainScreen_grupIstatistikTab">Grup Bazlı</a></li>
							</ul>
							<div id="flMainScreen_firmaIstatistikTab">
								<div id="flMainScreen_firmaIstatistikContainerDiv">
									<div id="flMainScreen_firmaIstatistikLeftDiv">
										<div class="flMainScreen_firmaIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="flMainScreen_firmaIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="flMainScreen_firmaIstatistikRow">
											<label>Firma:</label>
											<select id="flMainScreen_firmaIstatistikFirmaSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="flMainScreen_firmaIstatistikRightDiv">
										<div class="flMainScreen_firmaIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="flMainScreen_firmaIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="flMainScreen_firmaIstatistikButtonDiv">
									<input id="flMainScreen_firmaIstatistikSearchButton" type="Submit" value="Oluştur" onclick="flMainScreen_createCustomerStats()"/>
								</div>
								<div id="flMainScreen_firmaIstatistikSonucDiv">
									<div class="flMainScreen_firmaIstatistikSonucRow">
										<div class="flMainScreen_firmaIstatistikChartDiv" id="flMainScreen_firmaIstatistikTypeChart">
										</div>
										<div class="flMainScreen_firmaIstatistikChartDiv" id="flMainScreen_firmaIstatistikSatisM2Chart">
										</div>
										<div class="flMainScreen_firmaIstatistikChartDiv" id="flMainScreen_firmaIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="flMainScreen_firmaIstatistikSonucRow">
										<div class="flMainScreen_firmaIstatistikChartDiv" id="flMainScreen_firmaIstatistikIndirimTutarChart">
										</div>
										<div class="flMainScreen_firmaIstatistikChartDiv" id="flMainScreen_firmaIstatistikIptalSatisM2Chart">
										</div>
										<div class="flMainScreen_firmaIstatistikChartDiv" id="flMainScreen_firmaIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="flMainScreen_firmaIstatistikOzetDiv">
								</div>
							</div>
							<div id="flMainScreen_mtIstatistikTab">
								<div id="flMainScreen_mtIstatistikContainerDiv">
									<div id="flMainScreen_mtIstatistikLeftDiv">
										<div class="flMainScreen_mtIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="flMainScreen_mtIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="flMainScreen_mtIstatistikRow">
											<label>MT:</label>
											<select id="flMainScreen_mtIstatistikMTSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="flMainScreen_mtIstatistikRightDiv">
										<div class="flMainScreen_mtIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="flMainScreen_mtIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="flMainScreen_mtIstatistikButtonDiv">
									<input id="flMainScreen_mtIstatistikSearchButton" type="Submit" value="Oluştur" onclick="flMainScreen_createMTStats()"/>
								</div>
								<div id="flMainScreen_mtIstatistikSonucDiv">
									<div class="flMainScreen_mtIstatistikSonucRow">
										<div class="flMainScreen_mtIstatistikChartDiv" id="flMainScreen_mtIstatistikTypeChart">
										</div>
										<div class="flMainScreen_mtIstatistikChartDiv" id="flMainScreen_mtIstatistikSatisM2Chart">
										</div>
										<div class="flMainScreen_mtIstatistikChartDiv" id="flMainScreen_mtIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="flMainScreen_mtIstatistikSonucRow">
										<div class="flMainScreen_mtIstatistikChartDiv" id="flMainScreen_mtIstatistikIndirimTutarChart">
										</div>
										<div class="flMainScreen_mtIstatistikChartDiv" id="flMainScreen_mtIstatistikIptalSatisM2Chart">
										</div>
										<div class="flMainScreen_mtIstatistikChartDiv" id="flMainScreen_mtIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="flMainScreen_mtIstatistikOzetDiv">
								</div>
							</div>
							<div id="flMainScreen_fuarIstatistikTab">
								<div id="flMainScreen_fuarIstatistikContainerDiv">
									<div id="flMainScreen_fuarIstatistikLeftDiv">
										<div class="flMainScreen_fuarIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="flMainScreen_fuarIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="flMainScreen_fuarIstatistikRow">
											<label>fuar:</label>
											<select id="flMainScreen_fuarIstatistikFuarSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="flMainScreen_fuarIstatistikRightDiv">
										<div class="flMainScreen_fuarIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="flMainScreen_fuarIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="flMainScreen_fuarIstatistikButtonDiv">
									<input id="flMainScreen_fuarIstatistikSearchButton" type="Submit" value="Oluştur" onclick="flMainScreen_createFairStats()"/>
								</div>
								<div id="flMainScreen_fuarIstatistikSonucDiv">
									<div class="flMainScreen_fuarIstatistikSonucRow">
										<div class="flMainScreen_fuarIstatistikChartDiv" id="flMainScreen_fuarIstatistikTypeChart">
										</div>
										<div class="flMainScreen_fuarIstatistikChartDiv" id="flMainScreen_fuarIstatistikSatisM2Chart">
										</div>
										<div class="flMainScreen_fuarIstatistikChartDiv" id="flMainScreen_fuarIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="flMainScreen_fuarIstatistikSonucRow">
										<div class="flMainScreen_fuarIstatistikChartDiv" id="flMainScreen_fuarIstatistikIndirimTutarChart">
										</div>
										<div class="flMainScreen_fuarIstatistikChartDiv" id="flMainScreen_fuarIstatistikIptalSatisM2Chart">
										</div>
										<div class="flMainScreen_fuarIstatistikChartDiv" id="flMainScreen_fuarIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="flMainScreen_fuarIstatistikOzetDiv">
								</div>
							</div>
							<div id="flMainScreen_grupIstatistikTab">
								<div id="flMainScreen_grupIstatistikContainerDiv">
									<div id="flMainScreen_grupIstatistikLeftDiv">
										<div class="flMainScreen_grupIstatistikRow">
											<label>Başlangıç Tarihi:</label>
											<input type="text" id="flMainScreen_grupIstatistikBaslangicTarihiInput"/>
										</div>
										<div class="flMainScreen_grupIstatistikRow">
											<label>Grup:</label>
											<select id="flMainScreen_grupIstatistikGrupSelect">
												<option value="-1">Seçiniz</option>
											</select>
										</div>
									</div>
									<div id="flMainScreen_grupIstatistikRightDiv">
										<div class="flMainScreen_grupIstatistikRow">
											<label>Bitiş Tarihi:</label>
											<input type="text" id="flMainScreen_grupIstatistikBitisTarihiInput"/>
										</div>
									</div>
								</div>
								<div id="flMainScreen_grupIstatistikButtonDiv">
									<input id="flMainScreen_grupIstatistikSearchButton" type="Submit" value="Oluştur" onclick="flMainScreen_createGroupStats()"/>
								</div>
								<div id="flMainScreen_grupIstatistikSonucDiv">
									<div class="flMainScreen_grupIstatistikSonucRow">
										<div class="flMainScreen_grupIstatistikChartDiv" id="flMainScreen_grupIstatistikTypeChart">
										</div>
										<div class="flMainScreen_grupIstatistikChartDiv" id="flMainScreen_grupIstatistikSatisM2Chart">
										</div>
										<div class="flMainScreen_grupIstatistikChartDiv" id="flMainScreen_grupIstatistikSatisFiyatChart">
										</div>
									</div>
									<div class="flMainScreen_grupIstatistikSonucRow">
										<div class="flMainScreen_grupIstatistikChartDiv" id="flMainScreen_grupIstatistikIndirimTutarChart">
										</div>
										<div class="flMainScreen_grupIstatistikChartDiv" id="flMainScreen_grupIstatistikIptalSatisM2Chart">
										</div>
										<div class="flMainScreen_grupIstatistikChartDiv" id="flMainScreen_grupIstatistikIptalSatisFiyatChart">
										</div>
									</div>
								</div>
								<div id="flMainScreen_grupIstatistikOzetDiv">
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
		$this->scriptList[] = "plugins/flMainScreen/flMainScreen.js";
		return $this->scriptList;
	}
	
	public function getCss()
	{
		$this->cssList[] = "plugins/flMainScreen/flMainScreen.css";
		return $this->cssList;
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
			VALUES(?,?,?,?,?,1,CURDATE())");
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
			customerContactId,contractDate, extraNavlun, extraNavlunArea, extraNavlunPrice, pdfUploaded FROM contract WHERE contractId=?");
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
			
			$ownContract = false;
			if($customerRepresentativeId == $meridyen->user->userId)
			{
				$ownContract = true;
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
				, "extraNavlunArea" => $extraNavlunArea, "extraNavlunPrice" => $extraNavlunPrice, "ownContract" => $ownContract
				, "pdfUpload" => $pdfUpload);
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

	public static function getWaitingCustomers($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.fax, c.addedDate FROM customer c, customerbranch b, customersectorrelation d
			WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=0 AND c.customerId = d.customerId AND d.sectorId=? ORDER BY c.addedDate ASC";
		
		$getWaitingCustomersStatement = $db->prepare($queryString);
		$getWaitingCustomersStatement->bind_param("d",$meridyen->user->sectorId);	
		
		if($getWaitingCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["customers"] = array();
			$getWaitingCustomersStatement->store_result();
			$getWaitingCustomersStatement->bind_result($customerId, $title, $phoneNumber, $fax, $addedDate);
			while($getWaitingCustomersStatement->fetch())
			{
				$addedDateSplitted = explode("-",$addedDate);
				$addedDateMerged = $addedDateSplitted[2] . "/" . $addedDateSplitted[1] . "/" . $addedDateSplitted[0];
				$data["customers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "fax" => $fax, "addedDate" => 
					$addedDateMerged);
			}
			$getWaitingCustomersStatement->free_result();
		}
		$getWaitingCustomersStatement->close();
		return $data;
	}

	public static function confirmCustomer($meridyen,$customerId)
	{
		$data = array();
		$db = $meridyen->db;
		$confirmCustomerStatement = $db->prepare("UPDATE customer SET onay=1 WHERE customerId=?");
		$confirmCustomerStatement->bind_param("d",$customerId);
		if($confirmCustomerStatement->execute())
		{
			$data["status"] = "Ok";
			$confirmCustomerStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$confirmCustomerStatement->close();
		return $data;
	}

	public static function getWaitingContracts($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.contractId,c.contractDate, b.title, f.name, c.standArea FROM contract c, fair f, customer b, customersectorrelation cs 
			WHERE b.customerId = c.customerId AND f.fairId = c.fairId AND cs.customerId = c.customerId AND cs.sectorId=? 
			AND c.confirmed = 0 AND c.cancelled = 0 ORDER BY c.contractDate DESC";
		
		$searchContractsStatement = $db->prepare($queryString);
		$searchContractsStatement->bind_param("d", $meridyen->user->sectorId);
		
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
	
	public static function confirmContract($meridyen,$contractId)
	{
		$data = array();
		$db = $meridyen->db;
		$confirmContractStatement = $db->prepare("UPDATE contract SET confirmed=1 WHERE contractId=?");
		$confirmContractStatement->bind_param("d",$contractId);
		if($confirmContractStatement->execute())
		{
			$data["status"] = "Ok";
			$confirmContractStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$confirmContractStatement->close();
		return $data;
	}
	
	public static function cancelContract($meridyen,$contractId)
	{
		$data = array();
		$db = $meridyen->db;
		$cancelContractStatement = $db->prepare("UPDATE contract SET cancelled=1 WHERE contractId=?");
		$cancelContractStatement->bind_param("d",$contractId);
		if($cancelContractStatement->execute())
		{
			$data["status"] = "Ok";
			$cancelContractStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$cancelContractStatement->close();
		return $data;
	}
	
	public static function getNotLockedCustomers($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.fax FROM customer c, customerbranch b, customersectorrelation d
			WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=1 AND c.customerId = d.customerId AND d.sectorId=? AND c.customerId NOT IN (SELECT distinct(customerId) FROM
			customerlock WHERE untilDate>=curdate())";
		
		$getNotLockedCustomersStatement = $db->prepare($queryString);
		$getNotLockedCustomersStatement->bind_param("d",$meridyen->user->sectorId);	
		
		if($getNotLockedCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["customers"] = array();
			$getNotLockedCustomersStatement->store_result();
			$getNotLockedCustomersStatement->bind_result($customerId, $title, $phoneNumber, $fax);
			while($getNotLockedCustomersStatement->fetch())
			{
				$data["customers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "fax" => $fax);
			}
			$getNotLockedCustomersStatement->free_result();
		}
		$getNotLockedCustomersStatement->close();
		return $data;
	}
	
}