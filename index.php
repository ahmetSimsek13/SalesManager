<?php
define('MASTER_PAGE', 1);
require_once('core/inc/meridyen_setenv.php');
$meridyen->initHTML();

if($meridyen->user->accessLevel == 0)
{
	$login = new login($meridyen);
	$meridyen->html->addBodyContent("<div id='login_holder'>". $login->getMainHTML() . "</div>");
	$meridyen->html->addLinkCSS($login->getCss()); 
	$meridyen->html->addLinkJS($login->getScript());
}
else
{
	$login = new login($meridyen);
	$meridyen->html->addBodyContent("<div id='afterLogin_holder'>". $login->loginDivAfterLogin($meridyen) . "</div>");
	$meridyen->html->addLinkCSS($login->getCss()); 
	$meridyen->html->addLinkJS($login->getScript());
	
	if($meridyen->user->accessLevel == 1)
	{
		$mtMainScreen = new mtMainScreen($meridyen);
		$meridyen->html->addBodyContent($mtMainScreen->getMainHTML($meridyen));
		$meridyen->html->addLinkCSS($mtMainScreen->getCss()); 
		$meridyen->html->addLinkJS($mtMainScreen->getScript());
		
		$editCustomer = new editCustomer($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomer_holder'>". $editCustomer->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomer->getCss()); 
		$meridyen->html->addLinkJS($editCustomer->getScript());
		
		$editCustomerLocation = new editCustomerLocation($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomerLocation_holder'>". $editCustomerLocation->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomerLocation->getCss()); 
		$meridyen->html->addLinkJS($editCustomerLocation->getScript());
		
		$editCustomerContact = new editCustomerContact($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomerContact_holder'>". $editCustomerContact->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomerContact->getCss()); 
		$meridyen->html->addLinkJS($editCustomerContact->getScript());
		
		$addContract = new addContract($meridyen);
		$meridyen->html->addBodyContent("<div id='addContract_holder'>". $addContract->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($addContract->getCss()); 
		$meridyen->html->addLinkJS($addContract->getScript());
		
		$addMeeting = new addMeeting($meridyen);
		$meridyen->html->addBodyContent("<div id='addMeeting_holder'>". $addMeeting->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($addMeeting->getCss()); 
		$meridyen->html->addLinkJS($addMeeting->getScript());
		
		$passwordPlugin = new passwordPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='passwordPlugin_holder'>". $passwordPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($passwordPlugin->getCss()); 
		$meridyen->html->addLinkJS($passwordPlugin->getScript());
		
		$uploadifyPlugin = new uploadifyPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='uploadifyPlugin_holder'>". $uploadifyPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($uploadifyPlugin->getCss()); 
		$meridyen->html->addLinkJS($uploadifyPlugin->getScript());
	}
	else if($meridyen->user->accessLevel == 2)
	{
		$gyMainScreen = new gyMainScreen($meridyen);
		$meridyen->html->addBodyContent($gyMainScreen->getMainHTML($meridyen));
		$meridyen->html->addLinkCSS($gyMainScreen->getCss()); 
		$meridyen->html->addLinkJS($gyMainScreen->getScript());
		
		$newMT = new newMT($meridyen);
		$meridyen->html->addBodyContent("<div id='newMT_holder'>". $newMT->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($newMT->getCss()); 
		$meridyen->html->addLinkJS($newMT->getScript());
		
		$editCustomer = new editCustomer($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomer_holder'>". $editCustomer->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomer->getCss()); 
		$meridyen->html->addLinkJS($editCustomer->getScript());
		
		$editCustomerLocation = new editCustomerLocation($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomerLocation_holder'>". $editCustomerLocation->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomerLocation->getCss()); 
		$meridyen->html->addLinkJS($editCustomerLocation->getScript());
		
		$editCustomerContact = new editCustomerContact($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomerContact_holder'>". $editCustomerContact->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomerContact->getCss()); 
		$meridyen->html->addLinkJS($editCustomerContact->getScript());
		
		$addContract = new addContract($meridyen);
		$meridyen->html->addBodyContent("<div id='addContract_holder'>". $addContract->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($addContract->getCss()); 
		$meridyen->html->addLinkJS($addContract->getScript());
		
		$addMeeting = new addMeeting($meridyen);
		$meridyen->html->addBodyContent("<div id='addMeeting_holder'>". $addMeeting->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($addMeeting->getCss()); 
		$meridyen->html->addLinkJS($addMeeting->getScript());
		
		$passwordPlugin = new passwordPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='passwordPlugin_holder'>". $passwordPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($passwordPlugin->getCss()); 
		$meridyen->html->addLinkJS($passwordPlugin->getScript());
		
		$uploadifyPlugin = new uploadifyPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='uploadifyPlugin_holder'>". $uploadifyPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($uploadifyPlugin->getCss()); 
		$meridyen->html->addLinkJS($uploadifyPlugin->getScript());
	}
	else if($meridyen->user->accessLevel == 3)
	{
		$suMainScreen = new suMainScreen($meridyen);
		$meridyen->html->addBodyContent($suMainScreen->getMainHTML($meridyen));
		$meridyen->html->addLinkCSS($suMainScreen->getCss()); 
		$meridyen->html->addLinkJS($suMainScreen->getScript());
		
		$passwordPlugin = new passwordPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='passwordPlugin_holder'>". $passwordPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($passwordPlugin->getCss()); 
		$meridyen->html->addLinkJS($passwordPlugin->getScript());
		
		$newGY = new newGY($meridyen);
		$meridyen->html->addBodyContent("<div id='newGY_holder'>". $newGY->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($newGY->getCss()); 
		$meridyen->html->addLinkJS($newGY->getScript());
		
		$newFair = new newFair($meridyen);
		$meridyen->html->addBodyContent("<div id='newFair_holder'>". $newFair->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($newFair->getCss()); 
		$meridyen->html->addLinkJS($newFair->getScript());
		
		$editFair = new editFair($meridyen);
		$meridyen->html->addBodyContent("<div id='editFair_holder'>". $editFair->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editFair->getCss()); 
		$meridyen->html->addLinkJS($editFair->getScript());
		
		$showFairs = new showFairs($meridyen);
		$meridyen->html->addBodyContent("<div id='showFairs_holder'>". $showFairs->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($showFairs->getCss()); 
		$meridyen->html->addLinkJS($showFairs->getScript());
		
		$editMT = new editMT($meridyen);
		$meridyen->html->addBodyContent("<div id='editMT_holder'>". $editMT->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editMT->getCss()); 
		$meridyen->html->addLinkJS($editMT->getScript());
		
		$deleteMT = new deleteMT($meridyen);
		$meridyen->html->addBodyContent("<div id='deleteMT_holder'>". $deleteMT->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($deleteMT->getCss()); 
		$meridyen->html->addLinkJS($deleteMT->getScript());
	}
	else if($meridyen->user->accessLevel == 4)
	{
		$flMainScreen = new flMainScreen($meridyen);
		$meridyen->html->addBodyContent($flMainScreen->getMainHTML($meridyen));
		$meridyen->html->addLinkCSS($flMainScreen->getCss()); 
		$meridyen->html->addLinkJS($flMainScreen->getScript());
		
		$newFair = new newFair($meridyen);
		$meridyen->html->addBodyContent("<div id='newFair_holder'>". $newFair->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($newFair->getCss()); 
		$meridyen->html->addLinkJS($newFair->getScript());
		
		$editFair = new editFair($meridyen);
		$meridyen->html->addBodyContent("<div id='editFair_holder'>". $editFair->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editFair->getCss()); 
		$meridyen->html->addLinkJS($editFair->getScript());
		
		$showFairs = new showFairs($meridyen);
		$meridyen->html->addBodyContent("<div id='showFairs_holder'>". $showFairs->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($showFairs->getCss()); 
		$meridyen->html->addLinkJS($showFairs->getScript());
		
		$editCustomer = new editCustomer($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomer_holder'>". $editCustomer->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomer->getCss()); 
		$meridyen->html->addLinkJS($editCustomer->getScript());
		
		$editCustomerLocation = new editCustomerLocation($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomerLocation_holder'>". $editCustomerLocation->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomerLocation->getCss()); 
		$meridyen->html->addLinkJS($editCustomerLocation->getScript());
		
		$editCustomerContact = new editCustomerContact($meridyen);
		$meridyen->html->addBodyContent("<div id='editCustomerContact_holder'>". $editCustomerContact->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editCustomerContact->getCss()); 
		$meridyen->html->addLinkJS($editCustomerContact->getScript());
		
		$addContract = new addContract($meridyen);
		$meridyen->html->addBodyContent("<div id='addContract_holder'>". $addContract->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($addContract->getCss()); 
		$meridyen->html->addLinkJS($addContract->getScript());
		
		$addMeeting = new addMeeting($meridyen);
		$meridyen->html->addBodyContent("<div id='addMeeting_holder'>". $addMeeting->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($addMeeting->getCss()); 
		$meridyen->html->addLinkJS($addMeeting->getScript());
		
		$passwordPlugin = new passwordPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='passwordPlugin_holder'>". $passwordPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($passwordPlugin->getCss()); 
		$meridyen->html->addLinkJS($passwordPlugin->getScript());
		
		$uploadifyPlugin = new uploadifyPlugin($meridyen);
		$meridyen->html->addBodyContent("<div id='uploadifyPlugin_holder'>". $uploadifyPlugin->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($uploadifyPlugin->getCss()); 
		$meridyen->html->addLinkJS($uploadifyPlugin->getScript());
		
		$editContract = new editContract($meridyen);
		$meridyen->html->addBodyContent("<div id='editContract_holder'>". $editContract->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editContract->getCss()); 
		$meridyen->html->addLinkJS($editContract->getScript());
		
		$editMT = new editMT($meridyen);
		$meridyen->html->addBodyContent("<div id='editMT_holder'>". $editMT->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($editMT->getCss()); 
		$meridyen->html->addLinkJS($editMT->getScript());
		
		$deleteMT = new deleteMT($meridyen);
		$meridyen->html->addBodyContent("<div id='deleteMT_holder'>". $deleteMT->getMainHTML() . "</div>");
		$meridyen->html->addLinkCSS($deleteMT->getCss()); 
		$meridyen->html->addLinkJS($deleteMT->getScript());
	}
}
$meridyen->html->setTitle('Meridyen Personel Takip Sistemi');
$meridyen->html->finalize();
echo $meridyen->html->getFinalHTML();
?>
