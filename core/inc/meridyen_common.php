<?php
class meridyen_common
{
	public static function getCitiesOfCountry($meridyen, $countryId)
	{
		$data = array();
		$db = $meridyen->db;
		$data["cities"] = array();
		$getCitiesOfCountryStatement = $db->prepare("SELECT cityId,name FROM city WHERE countryId=?");
		$getCitiesOfCountryStatement->bind_param("d",$countryId);
		if($getCitiesOfCountryStatement->execute())
		{
			$data["status"] = "Ok";
			$getCitiesOfCountryStatement->store_result();
			$getCitiesOfCountryStatement->bind_result($cityId, $name);
			while($getCitiesOfCountryStatement->fetch())
			{
				$data["cities"][] = array("cityId" => $cityId, "name" => $name);
			}
			$getCitiesOfCountryStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$getCitiesOfCountryStatement->close();
		return $data;
	}
	
	public static function getCountries($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$getCountriesStatement = $db->prepare("SELECT countryId,name FROM country");
		if($getCountriesStatement->execute())
		{
			$data["countries"] = array();
			$data["status"] = "Ok";
			$getCountriesStatement->store_result();
			$getCountriesStatement->bind_result($countryId, $name);
			while($getCountriesStatement->fetch())
			{
				$data["countries"][] = array("countryId" => $countryId, "name" => $name);
			}
			$getCountriesStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$getCountriesStatement->close();
		return $data;
	}

	public static function getSectorInformation($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$sectorId = $meridyen->user->sectorId;
		$getSectorInformationStatement = $db->prepare("SELECT description FROM sector WHERE sectorId=?");
		$getSectorInformationStatement->bind_param("d",$sectorId);
		if($getSectorInformationStatement->execute())
		{
			$data["status"] = "Ok";
			$getSectorInformationStatement->store_result();
			$getSectorInformationStatement->bind_result($description);
			$getSectorInformationStatement->fetch();
			$data["description"] = $description;
			$data["sectorId"] = $sectorId;
			$getSectorInformationStatement->free_result();
		}
		$getSectorInformationStatement->close();
		return $data;
	}

	public static function getMyCustomers($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
	
		$contractQueryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=1 AND c.customerId IN (SELECT distinct(customerId) FROM customerlock WHERE untilDate >= adddate(curdate(), -30) AND userId=? AND lockType=2) ORDER BY c.title";
		
		$getMyCustomersStatement = $db->prepare($contractQueryString);
		$getMyCustomersStatement->bind_param("d", $meridyen->user->userId);
			
		if($getMyCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["contractCustomers"] = array();
			$getMyCustomersStatement->store_result();
			$getMyCustomersStatement->bind_result($customerId, $title, $phoneNumber, $website, $email);
			while($getMyCustomersStatement->fetch())
			{
				$getCustomerLockStatement = $db->prepare("SELECT c.userId FROM customerlock c, users u WHERE c.untilDate >= curdate() 
					AND c.customerId=? AND c.userId=u.userId AND u.userId=? ORDER BY c.untilDate DESC");
				$getCustomerLockStatement->bind_param("dd",$customerId,$meridyen->user->userId);
				$getCustomerLockStatement->execute();
				$getCustomerLockStatement->store_result();
				$locked = false; 
				$numRows = $getCustomerLockStatement->num_rows;
				if($numRows != 0)
				{
					$locked = true;
				}
				$data["contractCustomers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "website" => $website, "email" => $email, "locked" => $locked);
			}
			$getMyCustomersStatement->free_result();
		}
		$getMyCustomersStatement->close();
		
		$lockQueryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=1 AND c.customerId IN (SELECT distinct(customerId) FROM customerlock WHERE untilDate >= adddate(curdate(), -30) AND userId=? AND lockType!=2) AND
			c.customerId NOT IN (SELECT distinct(customerId) FROM customerlock WHERE untilDate >= adddate(curdate(), -30) AND userId=? AND lockType=2) ORDER BY c.title";
		
		$getMyCustomersStatement = $db->prepare($lockQueryString);
		$getMyCustomersStatement->bind_param("dd", $meridyen->user->userId, $meridyen->user->userId);
			
		if($getMyCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["lockCustomers"] = array();
			$getMyCustomersStatement->store_result();
			$getMyCustomersStatement->bind_result($customerId, $title, $phoneNumber, $website, $email);
			while($getMyCustomersStatement->fetch())
			{
				$getCustomerLockStatement = $db->prepare("SELECT c.userId FROM customerlock c, users u WHERE c.untilDate >= curdate() 
					AND c.customerId=? AND c.userId=u.userId AND u.userId=? ORDER BY c.untilDate DESC");
				$getCustomerLockStatement->bind_param("dd",$customerId,$meridyen->user->userId);
				$getCustomerLockStatement->execute();
				$getCustomerLockStatement->store_result();
				$locked = false; 
				$numRows = $getCustomerLockStatement->num_rows;
				if($numRows != 0)
				{
					$locked = true;
				}
				$data["lockCustomers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "website" => $website, "email" => $email, "locked" => $locked);
			}
			$getMyCustomersStatement->free_result();
		}
		$getMyCustomersStatement->close();
		return $data;
	}

	public static function getFairCustomers($meridyen, $fairId)
	{
		$data = array();
		$db = $meridyen->db;
	
		$contractQueryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
			b.type='Merkez' AND c.onay=1 AND c.customerId IN (SELECT distinct(customerId) FROM contract WHERE fairId=? AND confirmed=1 AND cancelled=0) ORDER BY c.title";
		
		$getFairCustomersStatement = $db->prepare($contractQueryString);
		$getFairCustomersStatement->bind_param("d", $fairId);
			
		if($getFairCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["fairCustomers"] = array();
			$getFairCustomersStatement->store_result();
			$getFairCustomersStatement->bind_result($customerId, $title, $phoneNumber, $website, $email);
			while($getFairCustomersStatement->fetch())
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
				$data["fairCustomers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "website" => $website, "email" => $email, "locked" => $locked);
			}
			$getFairCustomersStatement->free_result();
		}
		$getFairCustomersStatement->close();
		return $data;
	}
	
	public static function deleteCustomerContact($meridyen,$customerContactId)
	{
		$data = array();
		$db = $meridyen->db;
		$deleteCustomerContactStatement = $db->prepare("DELETE FROM customercontact WHERE customerContactId=?");
		$deleteCustomerContactStatement->bind_param("d",$customerContactId);
		if($deleteCustomerContactStatement->execute())
		{
			$data["status"] = "Ok";
			$deleteCustomerContactStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$deleteCustomerContactStatement->close();
		return $data;
	}
	
	public static function deleteCustomerBranch($meridyen,$branchId)
	{
		$data = array();
		$db = $meridyen->db;
		$deleteCustomerBranchStatement = $db->prepare("DELETE FROM customerbranch WHERE customerBranchId=?");
		$deleteCustomerBranchStatement->bind_param("d",$branchId);
		if($deleteCustomerBranchStatement->execute())
		{
			$data["status"] = "Ok";
			$deleteCustomerBranchStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$deleteCustomerBranchStatement->close();
		return $data;
	}
	
	public static function deleteCustomer($meridyen,$customerId)
	{
		$data = array();
		$db = $meridyen->db;
		$deleteCustomerStatement = $db->prepare("DELETE FROM customer WHERE customerId=?");
		$deleteCustomerStatement->bind_param("d",$customerId);
		if($deleteCustomerStatement->execute())
		{
			$data["status"] = "Ok";
			$deleteCustomerStatement->free_result();
		}
		else
			$data["status"] = "Error";
		$deleteCustomerStatement->close();
		return $data;
	}	

	public static function unlockCustomer($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
	
		$yesterday = strtotime("-1 day");
		$yesterdayStr = date("Y-m-d", $yesterday);
		$queryString = "UPDATE customerlock SET untilDate=? WHERE userId=? AND customerId=? AND untilDate > ?";
		
		$unlockCustomerStatement = $db->prepare($queryString);
		$unlockCustomerStatement->bind_param("sdds", $yesterdayStr, $meridyen->user->userId, $customerId, $yesterdayStr);	
		
		if($unlockCustomerStatement->execute())
		{
			$data["status"] = "Ok";
		}
		$unlockCustomerStatement->close();
		return $data;
	}

	public static function getSectors($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
		$sectorId = $meridyen->user->sectorId;
		$getSectorsStatement = $db->prepare("SELECT sectorId,description FROM sector");
		if($getSectorsStatement->execute())
		{
			$data["status"] = "Ok";
			$getSectorsStatement->store_result();
			$getSectorsStatement->bind_result($sectorId, $description);
			$data["sectors"] = array();
			while($getSectorsStatement->fetch())
			{
				$data["sectors"][] = array("description" => $description, "sectorId" => $sectorId);
			}
			$getSectorsStatement->free_result();
		}
		$getSectorsStatement->close();
		return $data;
	}

	public static function getAllCustomers($meridyen)
	{
		$data = array();
		$db = $meridyen->db;
	
		$queryString = "SELECT c.customerId, c.title FROM customer c WHERE c.onay=1";
		
		$getCustomersStatement = $db->prepare($queryString);
			
		if($getCustomersStatement->execute())
		{
			$data["status"] = "Ok";
			$data["customers"] = array();
			$getCustomersStatement->store_result();
			$getCustomersStatement->bind_result($customerId, $title);
			while($getCustomersStatement->fetch())
			{
				$data["customers"][] = array("customerId" => $customerId, "title" => $title);
			}
			$getCustomersStatement->free_result();
		}
		$getCustomersStatement->close();
		return $data;
	}

	public static function getCustomerDetails($meridyen, $customerId)
	{
		$data = array();
		$db = $meridyen->db;
		$getCustomerInformation = $db->prepare("SELECT c.title,c.taxOffice,c.taxId,c.brand,u.name,u.surname,c.addedDate FROM customer c, users u WHERE c.customerId=?
			AND c.userIdAdded=u.userId");
		$getCustomerInformation->bind_param("d",$customerId);
		if($getCustomerInformation->execute())
		{
			$data["status"] = "Ok";
			$getCustomerInformation->store_result();
			$getCustomerInformation->bind_result($title, $taxOffice, $taxId, $brand, $addedName, $addedSurname, $addedDate);
			$getCustomerInformation->fetch();
			$addedDateSplitted = explode("-",$addedDate);
			$addedDateMerged = $addedDateSplitted[2] . "/" . $addedDateSplitted[1] . "/" . $addedDateSplitted[0];
			
			$data["customerInfo"] = array("title" => $title, "taxOffice" => $taxOffice, "taxId" => $taxId, "brand" => $brand, 
				"addedName" => $addedName . " " . $addedSurname, "addedDate" => $addedDateMerged);
			$getCustomerInformation->free_result();
			
			$data["customerBranches"] = array();
			$getCustomerBranchesStatement = $db->prepare("SELECT a.customerBranchId,a.address,a.county,b.name,c.name,a.type,
				a.website,a.email,a.phoneNumber1,a.phoneNumber2,a.phoneNumber3,a.fax,a.notes FROM customerbranch a, city b, country c
				WHERE a.customerId=? AND c.countryId = a.countryId AND c.countryId = b.countryId AND b.cityId = a.cityId");
			$getCustomerBranchesStatement->bind_param("d",$customerId);
			$getCustomerBranchesStatement->execute();
			$getCustomerBranchesStatement->store_result();
			$getCustomerBranchesStatement->bind_result($branchId, $address, $county, $cityName, $countryName, $type, $website, $email,
				$phoneNumber1, $phoneNumber2, $phoneNumber3, $fax, $notes);
			while($getCustomerBranchesStatement->fetch())
			{
				$data["customerBranches"][] = array("branchId" => $branchId, "address" => $address, "county" => $county, "cityName" => $cityName
					, "countryName" => $countryName, "type" => $type, "website" => $website, "email" => $email, "phoneNumber1" => $phoneNumber1
					, "phoneNumber2" => $phoneNumber2, "phoneNumber3" => $phoneNumber3, "fax" => $fax, "notes" => $notes);
			}
			$getCustomerBranchesStatement->free_result();
			$getCustomerBranchesStatement->close();
			
			$data["customerContacts"] = array();
			$getCustomerContactsStatement = $db->prepare("SELECT customerContactId, name, surname, title, phone, branchType, emailAddress
				FROM customercontact WHERE customerId=?");
			$getCustomerContactsStatement->bind_param("d",$customerId);
			$getCustomerContactsStatement->execute();
			$getCustomerContactsStatement->store_result();
			$getCustomerContactsStatement->bind_result($customerContactId, $contactName, $contactSurname, $contactTitle, $contactPhone
				, $branchType, $emailAddress);
			while($getCustomerContactsStatement->fetch())
			{
				$data["customerContacts"][] = array("customerContactId" => $customerContactId, "contactName" => $contactName
					, "contactSurname" => $contactSurname, "contactTitle" => $contactTitle
					, "contactPhone" => $contactPhone, "branchType" => $branchType, "emailAddress" => $emailAddress);
			}
			$getCustomerContactsStatement->free_result();
			$getCustomerContactsStatement->close();
			
			$data["customerSectors"] = array();
			$getCustomerSectorsStatement = $db->prepare("SELECT c.sectorId, s.description FROM customersectorrelation c, sector s WHERE s.sectorId = c.sectorId
				AND c.customerId=?");
			$getCustomerSectorsStatement->bind_param("d",$customerId);
			$getCustomerSectorsStatement->execute();
			$getCustomerSectorsStatement->store_result();
			$getCustomerSectorsStatement->bind_result($sectorId, $description);
			while($getCustomerSectorsStatement->fetch())
			{
				$data["customerSectors"][] = array("sectorId" => $sectorId, "description" => $description);
			}
			$getCustomerSectorsStatement->free_result();
			$getCustomerSectorsStatement->close();
			
			$data["customerLock"] = array();
			$getCustomerLockStatement = $db->prepare("SELECT c.userId, u.name, u.surname FROM customerlock c, users u WHERE c.untilDate >= curdate() 
				AND c.customerId=? AND c.userId=u.userId ORDER BY c.untilDate DESC");
			$getCustomerLockStatement->bind_param("d",$customerId);
			$getCustomerLockStatement->execute();
			$getCustomerLockStatement->store_result();
			$lockedByUser = false;
			$lockedByAnotherUser = false;
			$numRows = $getCustomerLockStatement->num_rows;
			$lockedMT = null;
			if($numRows != 0)
			{
				$getCustomerLockStatement->bind_result($userId, $lockName, $lockSurname);
				$getCustomerLockStatement->fetch();
				$lockedMT = $lockName . " " . $lockSurname;
				if($userId == $meridyen->user->userId)
					$lockedByUser = true;
				else
					$lockedByAnotherUser = true;
			}
			$data["lockedByUser"] = $lockedByUser;
			$data["lockedMT"] = $lockedMT;
			$data["lockedByAnotherUser"] = $lockedByAnotherUser;
			$getCustomerLockStatement->free_result();
			$getCustomerLockStatement->close();
			
			$getCustomerLastContractStatement = $db->prepare("SELECT c.contractDate, f.name FROM contract c, fair f where c.fairId = f.fairId AND c.customerId=? AND c.confirmed=1 AND c.cancelled=0 ORDER BY contractDate DESC");
			$getCustomerLastContractStatement->bind_param("d",$customerId);
			$getCustomerLastContractStatement->execute();
			$getCustomerLastContractStatement->store_result();
			$numRows = $getCustomerLastContractStatement->num_rows;
			$contractCheck = false;
			$contractDateMerged = "";
			$fairName = "";
			if($numRows != 0)
			{
				$getCustomerLastContractStatement->bind_result($contractDate, $fairName);
				$getCustomerLastContractStatement->fetch();
				$contractCheck = true;
				$contractDateSplitted = explode("-",$contractDate);
				$contractDateMerged = $contractDateSplitted[2] . "/" . $contractDateSplitted[1] . "/" . $contractDateSplitted[0];
			}
			$data["contractCheck"] = $contractCheck;
			$data["lastContractDate"] = $contractDateMerged;
			$data["lastContractFair"] = $fairName;
		}
		else
			$data["status"] = "Error";
		$getCustomerInformation->close();
		return $data;
	}

	public static function getCustomerStats($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$startDateInput = $postArray["startDate"];
		$startDateSplitted = explode("/",$startDateInput);
		$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
		$endDateInput = $postArray["endDate"];
		$endDateSplitted = explode("/",$endDateInput);
		$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
		$contractCountStatement = $db->prepare("SELECT count(contractId) FROM contract WHERE customerId=? AND contractDate>=? AND contractDate <=?  AND confirmed = 1 AND cancelled = 0");
		$contractCountStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($contractCountStatement->execute())
		{
			$contractCountStatement->store_result();
			$contractCountStatement->bind_result($contractCount);
			$contractCountStatement->fetch();
			$data["contractCount"] = $contractCount;
			$contractCountStatement->free_result();
		}
		$contractCountStatement->close();
		
		$cancelledContractCountStatement = $db->prepare("SELECT count(contractId) FROM contract WHERE customerId=? AND contractDate>=? AND contractDate <=?  AND cancelled = 1");
		$cancelledContractCountStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractCountStatement->execute())
		{
			$cancelledContractCountStatement->store_result();
			$cancelledContractCountStatement->bind_result($cancelledContractCount);
			$cancelledContractCountStatement->fetch();
			$data["cancelledContractCount"] = $cancelledContractCount;
			$cancelledContractCountStatement->free_result();
		}
		$cancelledContractCountStatement->close();
		
		$data["gorusmeCount"] = 0;
		$data["randevuCount"] = 0;
		$meetingCountStatement = $db->prepare("SELECT meetingType,count(meetingId) FROM customermeeting WHERE customerId=? 
			AND meetingDate>=? AND meetingDate <=? GROUP BY meetingType");
		$meetingCountStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($meetingCountStatement->execute())
		{
			$meetingCountStatement->store_result();
			$meetingCountStatement->bind_result($meetingType, $meetingCount);
			while($meetingCountStatement->fetch())
			{
				if($meetingType == 0)
					$data["gorusmeCount"] = $meetingCount;
				else
					$data["randevuCount"] = $meetingCount;
			}
			$meetingCountStatement->free_result();
		}
		$meetingCountStatement->close();
		
		$data["satism2"] = array();
		$contractStandAreaStatement = $db->prepare("SELECT name,surname,SUM(standArea) FROM contract c, users u WHERE customerId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractStandAreaStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($contractStandAreaStatement->execute())
		{
			$contractStandAreaStatement->store_result();
			$contractStandAreaStatement->bind_result($name,$surname,$standArea);
			while($contractStandAreaStatement->fetch())
			{
				$data["satism2"][] = array("MT" => ($name . " " . $surname), "stand" => $standArea);
			}
			$contractStandAreaStatement->free_result();
		}
		$contractStandAreaStatement->close();
		
		$data["iptalSatism2"] = array();
		$cancelledContractStandAreaStatement = $db->prepare("SELECT name,surname,SUM(standArea) FROM contract c, users u WHERE customerId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name, surname");
		$cancelledContractStandAreaStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractStandAreaStatement->execute())
		{
			$cancelledContractStandAreaStatement->store_result();
			$cancelledContractStandAreaStatement->bind_result($name,$surname,$standArea);
			while($cancelledContractStandAreaStatement->fetch())
			{
				$data["iptalSatism2"][] = array("MT" => ($name . " " . $surname), "stand" => $standArea);
			}
			$cancelledContractStandAreaStatement->free_result();
		}
		$cancelledContractStandAreaStatement->close();
		
		$data["satisFiyat"] = array();
		$contractPriceStatement = $db->prepare("SELECT name,surname,SUM(contractAmountWithKdv) FROM contract c, users u WHERE customerId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractPriceStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($contractPriceStatement->execute())
		{
			$contractPriceStatement->store_result();
			$contractPriceStatement->bind_result($name,$surname,$price);
			while($contractPriceStatement->fetch())
			{
				$data["satisFiyat"][] = array("MT" => ($name . " " . $surname), "fiyat" => $price);
			}
			$contractPriceStatement->free_result();
		}
		$contractPriceStatement->close();
		
		$data["iptalSatisFiyat"] = array();
		$cancelledContractPriceStatement = $db->prepare("SELECT name,surname,SUM(contractAmountWithKdv) FROM contract c, users u WHERE customerId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name, surname");
		$cancelledContractPriceStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractPriceStatement->execute())
		{
			$cancelledContractPriceStatement->store_result();
			$cancelledContractPriceStatement->bind_result($name,$surname,$price);
			while($cancelledContractPriceStatement->fetch())
			{
				$data["iptalSatisFiyat"][] = array("MT" => ($name . " " . $surname), "fiyat" => $price);
			}
			$cancelledContractPriceStatement->free_result();
		}
		$cancelledContractPriceStatement->close();
		
		$data["indirimTutar"] = array();
		$contractDiscountAmountStatement = $db->prepare("SELECT name,surname,SUM(discountAmount) FROM contract c, users u WHERE customerId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractDiscountAmountStatement->bind_param("dss", $postArray["customerId"], $startDateMerged, $endDateMerged);
		
		if($contractDiscountAmountStatement->execute())
		{
			$contractDiscountAmountStatement->store_result();
			$contractDiscountAmountStatement->bind_result($name,$surname,$discountAmount);
			while($contractDiscountAmountStatement->fetch())
			{
				$data["indirimTutar"][] = array("MT" => ($name . " " . $surname), "tutar" => $discountAmount);
			}
			$contractDiscountAmountStatement->free_result();
		}
		$contractDiscountAmountStatement->close();
		
		return $data;
	}
	
	public static function getMTStats($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$startDateInput = $postArray["startDate"];
		$startDateSplitted = explode("/",$startDateInput);
		$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
		$endDateInput = $postArray["endDate"];
		$endDateSplitted = explode("/",$endDateInput);
		$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
		$contractCountStatement = $db->prepare("SELECT count(contractId) FROM contract WHERE customerRepresentativeId=? AND contractDate>=? AND contractDate <=?
			AND confirmed = 1 AND cancelled = 0");
		$contractCountStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($contractCountStatement->execute())
		{
			$contractCountStatement->store_result();
			$contractCountStatement->bind_result($contractCount);
			$contractCountStatement->fetch();
			$data["contractCount"] = $contractCount;
			$contractCountStatement->free_result();
		}
		$contractCountStatement->close();
		
		$cancelledContractCountStatement = $db->prepare("SELECT count(contractId) FROM contract WHERE customerRepresentativeId=? AND contractDate>=? AND contractDate <=?
			AND cancelled = 1");
		$cancelledContractCountStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractCountStatement->execute())
		{
			$cancelledContractCountStatement->store_result();
			$cancelledContractCountStatement->bind_result($cancelledContractCount);
			$cancelledContractCountStatement->fetch();
			$data["cancelledContractCount"] = $cancelledContractCount;
			$cancelledContractCountStatement->free_result();
		}
		$cancelledContractCountStatement->close();
		
		$data["gorusmeCount"] = 0;
		$data["randevuCount"] = 0;
		$meetingCountStatement = $db->prepare("SELECT meetingType,count(meetingId) FROM customermeeting WHERE customerRepresentativeId=? 
			AND meetingDate>=? AND meetingDate <=? GROUP BY meetingType");
		$meetingCountStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($meetingCountStatement->execute())
		{
			$meetingCountStatement->store_result();
			$meetingCountStatement->bind_result($meetingType, $meetingCount);
			while($meetingCountStatement->fetch())
			{
				if($meetingType == 0)
					$data["gorusmeCount"] = $meetingCount;
				else
					$data["randevuCount"] = $meetingCount;
			}
			$meetingCountStatement->free_result();
		}
		$meetingCountStatement->close();
		
		$data["satism2"] = array();
		$contractStandAreaStatement = $db->prepare("SELECT name,SUM(standArea) FROM contract c, fair f WHERE c.customerRepresentativeId=?
			AND c.fairId = f.fairId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name");
		$contractStandAreaStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($contractStandAreaStatement->execute())
		{
			$contractStandAreaStatement->store_result();
			$contractStandAreaStatement->bind_result($name,$standArea);
			while($contractStandAreaStatement->fetch())
			{
				$data["satism2"][] = array("fair" => $name, "stand" => $standArea);
			}
			$contractStandAreaStatement->free_result();
		}
		$contractStandAreaStatement->close();
		
		$data["iptalSatism2"] = array();
		$cancelledContractStandAreaStatement = $db->prepare("SELECT name,SUM(standArea) FROM contract c, fair f WHERE c.customerRepresentativeId=?
			AND c.fairId = f.fairId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name");
		$cancelledContractStandAreaStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractStandAreaStatement->execute())
		{
			$cancelledContractStandAreaStatement->store_result();
			$cancelledContractStandAreaStatement->bind_result($name,$standArea);
			while($cancelledContractStandAreaStatement->fetch())
			{
				$data["iptalSatism2"][] = array("fair" => $name, "stand" => $standArea);
			}
			$cancelledContractStandAreaStatement->free_result();
		}
		$cancelledContractStandAreaStatement->close();
		
		$data["satisFiyat"] = array();
		$contractPriceStatement = $db->prepare("SELECT name,SUM(contractAmountWithKdv) FROM contract c, fair f WHERE c.customerRepresentativeId=?
			AND c.fairId = f.fairId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name");
		$contractPriceStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($contractPriceStatement->execute())
		{
			$contractPriceStatement->store_result();
			$contractPriceStatement->bind_result($name,$price);
			while($contractPriceStatement->fetch())
			{
				$data["satisFiyat"][] = array("fair" => $name, "fiyat" => $price);
			}
			$contractPriceStatement->free_result();
		}
		$contractPriceStatement->close();
		
		$data["iptalSatisFiyat"] = array();
		$cancelledContractPriceStatement = $db->prepare("SELECT name,SUM(contractAmountWithKdv) FROM contract c, fair f WHERE c.customerRepresentativeId=?
			AND c.fairId = f.fairId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name");
		$cancelledContractPriceStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractPriceStatement->execute())
		{
			$cancelledContractPriceStatement->store_result();
			$cancelledContractPriceStatement->bind_result($name,$price);
			while($cancelledContractPriceStatement->fetch())
			{
				$data["iptalSatisFiyat"][] = array("fair" => $name, "fiyat" => $price);
			}
			$cancelledContractPriceStatement->free_result();
		}
		$cancelledContractPriceStatement->close();
		
		$data["indirimTutar"] = array();
		$contractDiscountAmountStatement = $db->prepare("SELECT name,SUM(discountAmount) FROM contract c, fair f WHERE c.customerRepresentativeId=?
			AND c.fairId = f.fairId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name");
		$contractDiscountAmountStatement->bind_param("dss", $postArray["mtId"], $startDateMerged, $endDateMerged);
		
		if($contractDiscountAmountStatement->execute())
		{
			$contractDiscountAmountStatement->store_result();
			$contractDiscountAmountStatement->bind_result($name,$discountAmount);
			while($contractDiscountAmountStatement->fetch())
			{
				$data["indirimTutar"][] = array("fair" => $name, "tutar" => $discountAmount);
			}
			$contractDiscountAmountStatement->free_result();
		}
		$contractDiscountAmountStatement->close();
		
		return $data;
	}

	public static function getFairStats($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$startDateInput = $postArray["startDate"];
		$startDateSplitted = explode("/",$startDateInput);
		$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
		$endDateInput = $postArray["endDate"];
		$endDateSplitted = explode("/",$endDateInput);
		$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
		$contractCountStatement = $db->prepare("SELECT count(contractId) FROM contract WHERE fairId=? AND contractDate>=? AND contractDate <=?
			AND confirmed = 1 AND cancelled = 0");
		$contractCountStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($contractCountStatement->execute())
		{
			$contractCountStatement->store_result();
			$contractCountStatement->bind_result($contractCount);
			$contractCountStatement->fetch();
			$data["contractCount"] = $contractCount;
			$contractCountStatement->free_result();
		}
		$contractCountStatement->close();
		
		$cancelledContractCountStatement = $db->prepare("SELECT count(contractId) FROM contract WHERE fairId=? AND contractDate>=? AND contractDate <=?
			AND cancelled = 1");
		$cancelledContractCountStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractCountStatement->execute())
		{
			$cancelledContractCountStatement->store_result();
			$cancelledContractCountStatement->bind_result($cancelledContractCount);
			$cancelledContractCountStatement->fetch();
			$data["cancelledContractCount"] = $cancelledContractCount;
			$cancelledContractCountStatement->free_result();
		}
		$cancelledContractCountStatement->close();
		
		$data["gorusmeCount"] = 0;
		$data["randevuCount"] = 0;
		$meetingCountStatement = $db->prepare("SELECT meetingType,count(meetingId) FROM customermeeting WHERE fairId=? 
			AND meetingDate>=? AND meetingDate <=? GROUP BY meetingType");
		$meetingCountStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($meetingCountStatement->execute())
		{
			$meetingCountStatement->store_result();
			$meetingCountStatement->bind_result($meetingType, $meetingCount);
			while($meetingCountStatement->fetch())
			{
				if($meetingType == 0)
					$data["gorusmeCount"] = $meetingCount;
				else
					$data["randevuCount"] = $meetingCount;
			}
			$meetingCountStatement->free_result();
		}
		$meetingCountStatement->close();
		
		$data["satism2"] = array();
		$contractStandAreaStatement = $db->prepare("SELECT name,surname,SUM(standArea) FROM contract c, users u WHERE fairId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractStandAreaStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($contractStandAreaStatement->execute())
		{
			$contractStandAreaStatement->store_result();
			$contractStandAreaStatement->bind_result($name,$surname,$standArea);
			while($contractStandAreaStatement->fetch())
			{
				$data["satism2"][] = array("MT" => ($name . " " . $surname), "stand" => $standArea);
			}
			$contractStandAreaStatement->free_result();
		}
		$contractStandAreaStatement->close();
		
		$data["iptalSatism2"] = array();
		$cancelledContractStandAreaStatement = $db->prepare("SELECT name,surname,SUM(standArea) FROM contract c, users u WHERE fairId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name, surname");
		$cancelledContractStandAreaStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractStandAreaStatement->execute())
		{
			$cancelledContractStandAreaStatement->store_result();
			$cancelledContractStandAreaStatement->bind_result($name,$surname,$standArea);
			while($cancelledContractStandAreaStatement->fetch())
			{
				$data["iptalSatism2"][] = array("MT" => ($name . " " . $surname), "stand" => $standArea);
			}
			$cancelledContractStandAreaStatement->free_result();
		}
		$cancelledContractStandAreaStatement->close();
		
		$data["satisFiyat"] = array();
		$contractPriceStatement = $db->prepare("SELECT name,surname,SUM(contractAmountWithKdv) FROM contract c, users u WHERE fairId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractPriceStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($contractPriceStatement->execute())
		{
			$contractPriceStatement->store_result();
			$contractPriceStatement->bind_result($name,$surname,$price);
			while($contractPriceStatement->fetch())
			{
				$data["satisFiyat"][] = array("MT" => ($name . " " . $surname), "fiyat" => $price);
			}
			$contractPriceStatement->free_result();
		}
		$contractPriceStatement->close();
		
		$data["iptalSatisFiyat"] = array();
		$cancelledContractPriceStatement = $db->prepare("SELECT name,surname,SUM(contractAmountWithKdv) FROM contract c, users u WHERE fairId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name, surname");
		$cancelledContractPriceStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractPriceStatement->execute())
		{
			$cancelledContractPriceStatement->store_result();
			$cancelledContractPriceStatement->bind_result($name,$surname,$price);
			while($cancelledContractPriceStatement->fetch())
			{
				$data["iptalSatisFiyat"][] = array("MT" => ($name . " " . $surname), "fiyat" => $price);
			}
			$cancelledContractPriceStatement->free_result();
		}
		$cancelledContractPriceStatement->close();
		
		$data["indirimTutar"] = array();
		$contractDiscountAmountStatement = $db->prepare("SELECT name,surname,SUM(discountAmount) FROM contract c, users u WHERE fairId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractDiscountAmountStatement->bind_param("dss", $postArray["fairId"], $startDateMerged, $endDateMerged);
		
		if($contractDiscountAmountStatement->execute())
		{
			$contractDiscountAmountStatement->store_result();
			$contractDiscountAmountStatement->bind_result($name,$surname,$discountAmount);
			while($contractDiscountAmountStatement->fetch())
			{
				$data["indirimTutar"][] = array("MT" => ($name . " " . $surname), "tutar" => $discountAmount);
			}
			$contractDiscountAmountStatement->free_result();
		}
		$contractDiscountAmountStatement->close();
		
		return $data;
	}
	
	public static function getGroupStats($meridyen, $postArray)
	{
		$data = array();
		$db = $meridyen->db;
	
		$startDateInput = $postArray["startDate"];
		$startDateSplitted = explode("/",$startDateInput);
		$startDateMerged = $startDateSplitted[2] . "-" . $startDateSplitted[1] . "-" . $startDateSplitted[0];
		
		$endDateInput = $postArray["endDate"];
		$endDateSplitted = explode("/",$endDateInput);
		$endDateMerged = $endDateSplitted[2] . "-" . $endDateSplitted[1] . "-" . $endDateSplitted[0];
	
		$contractCountStatement = $db->prepare("SELECT count(contractId) FROM contract c, users u WHERE c.customerRepresentativeId = u.userId AND u.sectorId=? AND c.contractDate>=? AND c.contractDate <=?  AND confirmed = 1 AND cancelled = 0");
		$contractCountStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($contractCountStatement->execute())
		{
			$contractCountStatement->store_result();
			$contractCountStatement->bind_result($contractCount);
			$contractCountStatement->fetch();
			$data["contractCount"] = $contractCount;
			$contractCountStatement->free_result();
		}
		$contractCountStatement->close();
		
		$cancelledContractCountStatement = $db->prepare("SELECT count(contractId) FROM contract c, users u WHERE c.customerRepresentativeId = u.userId AND u.sectorId=? AND c.contractDate>=? AND c.contractDate <=?  AND cancelled = 1");
		$cancelledContractCountStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractCountStatement->execute())
		{
			$cancelledContractCountStatement->store_result();
			$cancelledContractCountStatement->bind_result($cancelledContractCount);
			$cancelledContractCountStatement->fetch();
			$data["cancelledContractCount"] = $cancelledContractCount;
			$cancelledContractCountStatement->free_result();
		}
		$cancelledContractCountStatement->close();
		
		$data["gorusmeCount"] = 0;
		$data["randevuCount"] = 0;
		$meetingCountStatement = $db->prepare("SELECT meetingType,count(meetingId) FROM customermeeting c, users u WHERE 
			c.customerRepresentativeId = u.userId AND u.sectorId = ? AND c.meetingDate>=? AND c.meetingDate <=? GROUP BY c.meetingType");
		$meetingCountStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($meetingCountStatement->execute())
		{
			$meetingCountStatement->store_result();
			$meetingCountStatement->bind_result($meetingType, $meetingCount);
			while($meetingCountStatement->fetch())
			{
				if($meetingType == 0)
					$data["gorusmeCount"] = $meetingCount;
				else
					$data["randevuCount"] = $meetingCount;
			}
			$meetingCountStatement->free_result();
		}
		$meetingCountStatement->close();
		
		$data["satism2"] = array();
		$contractStandAreaStatement = $db->prepare("SELECT name,surname,SUM(standArea) FROM contract c, users u WHERE u.sectorId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractStandAreaStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($contractStandAreaStatement->execute())
		{
			$contractStandAreaStatement->store_result();
			$contractStandAreaStatement->bind_result($name,$surname,$standArea);
			while($contractStandAreaStatement->fetch())
			{
				$data["satism2"][] = array("MT" => ($name . " " . $surname), "stand" => $standArea);
			}
			$contractStandAreaStatement->free_result();
		}
		$contractStandAreaStatement->close();
		
		$data["iptalSatism2"] = array();
		$cancelledContractStandAreaStatement = $db->prepare("SELECT name,surname,SUM(standArea) FROM contract c, users u WHERE u.sectorId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name, surname");
		$cancelledContractStandAreaStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractStandAreaStatement->execute())
		{
			$cancelledContractStandAreaStatement->store_result();
			$cancelledContractStandAreaStatement->bind_result($name,$surname,$standArea);
			while($cancelledContractStandAreaStatement->fetch())
			{
				$data["iptalSatism2"][] = array("MT" => ($name . " " . $surname), "stand" => $standArea);
			}
			$cancelledContractStandAreaStatement->free_result();
		}
		$cancelledContractStandAreaStatement->close();
		
		$data["satisFiyat"] = array();
		$contractPriceStatement = $db->prepare("SELECT name,surname,SUM(contractAmountWithKdv) FROM contract c, users u WHERE u.sectorId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractPriceStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($contractPriceStatement->execute())
		{
			$contractPriceStatement->store_result();
			$contractPriceStatement->bind_result($name,$surname,$price);
			while($contractPriceStatement->fetch())
			{
				$data["satisFiyat"][] = array("MT" => ($name . " " . $surname), "fiyat" => $price);
			}
			$contractPriceStatement->free_result();
		}
		$contractPriceStatement->close();
		
		$data["iptalSatisFiyat"] = array();
		$cancelledContractPriceStatement = $db->prepare("SELECT name,surname,SUM(contractAmountWithKdv) FROM contract c, users u WHERE u.sectorId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c. cancelled = 1 GROUP BY name, surname");
		$cancelledContractPriceStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($cancelledContractPriceStatement->execute())
		{
			$cancelledContractPriceStatement->store_result();
			$cancelledContractPriceStatement->bind_result($name,$surname,$price);
			while($cancelledContractPriceStatement->fetch())
			{
				$data["iptalSatisFiyat"][] = array("MT" => ($name . " " . $surname), "fiyat" => $price);
			}
			$cancelledContractPriceStatement->free_result();
		}
		$cancelledContractPriceStatement->close();
		
		$data["indirimTutar"] = array();
		$contractDiscountAmountStatement = $db->prepare("SELECT name,surname,SUM(discountAmount) FROM contract c, users u WHERE u.sectorId=?
			AND c.customerRepresentativeId = u.userId AND contractDate>=? AND contractDate <=? AND c.confirmed = 1 AND c. cancelled = 0 GROUP BY name, surname");
		$contractDiscountAmountStatement->bind_param("dss", $postArray["groupId"], $startDateMerged, $endDateMerged);
		
		if($contractDiscountAmountStatement->execute())
		{
			$contractDiscountAmountStatement->store_result();
			$contractDiscountAmountStatement->bind_result($name,$surname,$discountAmount);
			while($contractDiscountAmountStatement->fetch())
			{
				$data["indirimTutar"][] = array("MT" => ($name . " " . $surname), "tutar" => $discountAmount);
			}
			$contractDiscountAmountStatement->free_result();
		}
		$contractDiscountAmountStatement->close();
		
		return $data;
	}
	
	public static function getMTLockedCustomers($meridyen, $mtId, $lockType)
	{
		$data = array();
		$db = $meridyen->db;
		$data["lockedCustomers"] = array();
		if($meridyen->user->accessLevel != 3 && $meridyen->user->accessLevel != 4)
		{
			$data['status'] = 'userError';
			return $data;
		}
	
		if($lockType == 0)
		{
			$contractQueryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
				b.type='Merkez' AND c.onay=1 AND c.customerId IN (SELECT distinct(customerId) FROM customerlock WHERE untilDate >= curdate() AND userId=? AND lockType=2) ORDER BY c.title";
		
			$getMTLockedCustomersStatement = $db->prepare($contractQueryString);
			$getMTLockedCustomersStatement->bind_param("d", $mtId);
				
			if($getMTLockedCustomersStatement->execute())
			{
				$data["status"] = "Ok";
				$getMTLockedCustomersStatement->store_result();
				$getMTLockedCustomersStatement->bind_result($customerId, $title, $phoneNumber, $website, $email);
				while($getMTLockedCustomersStatement->fetch())
				{
					$getCustomerLockStatement = $db->prepare("SELECT c.userId FROM customerlock c, users u WHERE c.untilDate >= curdate() 
						AND c.customerId=?");
					$getCustomerLockStatement->bind_param("d",$customerId);
					$getCustomerLockStatement->execute();
					$getCustomerLockStatement->store_result();
					$locked = false; 
					$numRows = $getCustomerLockStatement->num_rows;
					if($numRows != 0)
					{
						$locked = true;
					}
					$data["lockedCustomers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "website" => $website, "email" => $email, "locked" => $locked);
				}
				$getMTLockedCustomersStatement->free_result();
			}
			$getMTLockedCustomersStatement->close();
		}
		else
		{
			$lockQueryString = "SELECT c.customerId, c.title, b.phoneNumber1, b.website, b.email FROM customer c, customerbranch b WHERE c.customerId = b.customerId AND 
				b.type='Merkez' AND c.onay=1 AND c.customerId IN (SELECT distinct(customerId) FROM customerlock WHERE untilDate >= curdate() AND userId=? AND lockType!=2) AND
				c.customerId NOT IN (SELECT distinct(customerId) FROM customerlock WHERE untilDate >= curdate() AND userId=? AND lockType=2) ORDER BY c.title";
		
			$getMTLockedCustomersStatement = $db->prepare($lockQueryString);
			$getMTLockedCustomersStatement->bind_param("dd", $mtId, $mtId);
			
			if($getMTLockedCustomersStatement->execute())
			{
				$data["status"] = "Ok";
				$data["lockedCustomers"] = array();
				$getMTLockedCustomersStatement->store_result();
				$getMTLockedCustomersStatement->bind_result($customerId, $title, $phoneNumber, $website, $email);
				while($getMTLockedCustomersStatement->fetch())
				{
					$getCustomerLockStatement = $db->prepare("SELECT c.userId FROM customerlock c, users u WHERE c.untilDate >= curdate() 
						AND c.customerId=?");
					$getCustomerLockStatement->bind_param("d",$customerId);
					$getCustomerLockStatement->execute();
					$getCustomerLockStatement->store_result();
					$locked = false; 
					$numRows = $getCustomerLockStatement->num_rows;
					if($numRows != 0)
					{
						$locked = true;
					}
					$data["lockedCustomers"][] = array("customerId" => $customerId, "title" => $title, "phoneNumber" => $phoneNumber, "website" => $website, "email" => $email, "locked" => $locked);
				}
				$getMTLockedCustomersStatement->free_result();
			}
			$getMTLockedCustomersStatement->close();
		}
		return $data;
	}
}