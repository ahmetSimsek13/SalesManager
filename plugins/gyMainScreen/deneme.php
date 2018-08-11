<?php
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
?>