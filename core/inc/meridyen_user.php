<?php

class meridyen_user
{
	public 	$userId;
	public  $email,$name,$surname,$accessLevel,$sectorId;
	public  $lastLoginTime, $loginIP;
	public  $emptyPassword;
	public	$maxLockCount;
	private $db;
	
	public function __construct(&$meridyen)
	{
		$this->db = &$meridyen->db;
		$this->loginIP = $_SERVER["REMOTE_ADDR"];
		$this->email = '';
		$this->name = '';
		$this->surname = '';
		$this->accessLevel = 0;
		$this->sectorId = 0;
		$this->userId = 0;
		$this->maxLockCount = 0;
		$this->emptyPassword = false;
		$this->passwordUpdate = false;
	}
	
	public function checkUser($email, $password)
	{
		$statement = $this->db->prepare("SELECT userId,email,name,surname,password,accessLevel,sectorId,maxLockCount,DATEDIFF(CURDATE(), sifreTarihi) FROM users WHERE email=? AND active=1");
		$statement->bind_param("s",$email);
		$statement->execute();
		$statement->store_result();
		if($statement->num_rows == 0)
		{
			$statement->close();
			return false;
		}
		$statement->bind_result($userId,$email,$name,$surname,$dbPassword,$accessLevel,$sectorId,$maxLockCount, $dateDiff);
		$statement->fetch();
		if($password != $dbPassword)
		{
			$statement->close();
			return false;
		}
		else
		{
			$this->email = $email;
			$this->name = $name;
			$this->surname = $surname;
			$this->accessLevel = $accessLevel;
			$this->sectorId = $sectorId;
			$this->userId = $userId;
			$this->maxLockCount = $maxLockCount;
			if(strcmp($dbPassword, "") == 0)
				$this->emptyPassword = true;
			else
				$this->emptyPassword = false;
		
			if($dateDiff >= 90)
				$this->passwordUpdate = true;
			else
				$this->passwordUpdate = false;
			$this->reloadSession();
			return true;
		}
		
	}
	
	public function logoutUser()
	{
		$this->email = '';
		$this->name = '';
		$this->surname = '';
		$this->accessLevel = 0;
		$this->sectorId = 0;
		$this->userId = 0;
		$this->maxLockCount = 0;
		$this->reloadSession();
	}
	
	public function setRoot(&$meridyen)
	{
		$this->db = &$meridyen->db;
	}
	
	private function setUser($email)
	{
		$this->email = $email;
	}
	
	private function reloadSession()
	{
		$_SESSION['meridyenuser'] = serialize($this);
	}
	
	public function setEmptyPassword($emptyPassword)
	{
		$this->emptyPassword = $emptyPassword;
		$_SESSION['meridyenuser'] = serialize($this);
	}
	
	public function setPasswordUpdate($passwordUpdate)
	{
		$this->passwordUpdate = $passwordUpdate;
		$_SESSION['meridyenuser'] = serialize($this);
	}
}
?>