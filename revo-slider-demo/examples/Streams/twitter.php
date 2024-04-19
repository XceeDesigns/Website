<?php
// TWITTER CONNECT STREAM CLASS
require_once '../../revolution/php/twitter/class-twitter.php';

// TWITTER USER
$twitter_account = "verycoolplaces";

// API DATA
// Register App -> https://apps.twitter.com/
$consumer_key = 'YOUR_CONSUMER_KEY';
$consumer_secret = 'YOUR_CONSUMER_SECRET';
$access_token = 'YOUR_ACCESS_TOKEN';
$access_token_secret = 'YOUR_ACCESS_TOKEN_SECRET';

// GET TWEETS
$twitter = new TP_twitter( $consumer_key, $consumer_secret, $access_token, $access_token_secret );
$tweets = $twitter->get_public_photos( $twitter_account );

?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Slider Revolution 5.0</title>
	<meta name="description" content="Slider Revolution 5.0 Example" />
	<meta name="keywords" content="fullscreen image, grid layout, flexbox grid, transition" />
	<meta name="author" content="ThemePunch" />
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- LOAD JQUERY LIBRARY -->
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js"></script>

	<!-- DEMO STYLE SHEET - NO NEED FOR FURTHER USE-->	
	<link rel='stylesheet' type='text/css' href='../../assets/css/noneed.css'>

	
	<!-- LOADING FONTS AND ICONS -->
	<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Roboto:900,700,500,400,300,100' >	
	<link rel='stylesheet' type='text/css' href='../../revolution/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css' >	
	<link rel='stylesheet' type='text/css' href='../../revolution/fonts/font-awesome/css/font-awesome.css' >	
	
	<!-- REVOLUTION STYLE SHEETS -->
	<link rel='stylesheet' type='text/css' href='../../revolution/css/settings.css'>	
	
	<!-- REVOLUTION LAYERS STYLES -->
	<link rel='stylesheet' type='text/css' href='../../revolution/css/layers.css'>	

	<!-- REVOLUTION NAVIGATION STYLES -->
	<link rel='stylesheet' type='text/css' href='../../revolution/css/navigation.css'>	

	<!-- REVOLUTION JS FILES -->
	<script type='text/javascript' src='../../revolution/js/jquery.themepunch.tools.min.js?rev=5.0'></script>
	<script type='text/javascript' src='../../revolution/js/jquery.themepunch.revolution.min.js?rev=5.0'></script>

	<!-- SLIDER REVOLUTION 5.0 EXTENSIONS  (Load them on Local File System !  Can be removed on Server for On Demand Loading) -->
	<script type="text/javascript" src="../../revolution/js/extensions/source/revolution.extension.slideanims.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/source/revolution.extension.actions.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/source/revolution.extension.layeranimation.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/source/revolution.extension.navigation.js"></script>

</head>

<body>
	<!--[if lt IE 7]>
	<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
	<![endif]-->

	<!-- HEADER -->
    <article class="content">
        <!-- Add your site or application content here -->
        <section class="header">
            <span class="logo" style="float:left"></span>
            <a class="button" style="float:right" href="http://www.themepunch.com/revsliderjquery-doc/slider-revolution-jquery-5-x-documentation/"><i class="pe-7s-help2"></i>Online Documentation</a>
            <div class="clearfix"></div>
        </section>
    </article>

    <article class="small-history">
        <h2 class="textaligncenter" style="margin-bottom:25px;">Carousel Example</h2>        
        <p>This examples loads a PHP class that automatically populates the slider by a Twitter Stream.</p>
		<p>We are using the basic libraries of Slider Revolution, just like the standard style sheets and some Google Fonts.</p>
		<hr>		
		<ul>
			<li>Enter the ID of the twitter stream in the first PHP block: <br>
				<pre>$twitter_account = "verycoolplaces";</pre><br></li>
			<li><a href="https://apps.twitter.com/">Register</a> your Application at Twitter and add resulting API data and enter there too:<br>
				<pre>$consumer_key = 'b9Vs1dT...';
	$consumer_secret = 'K6j1dv7...';
	$access_token = '85982608-F56y...';
	$access_token_secret = 'OaPgI1OECtkA7nmbofcH...';</pre>
			</li>
		</ul>    
    </article>

	<section class="example">
		<article class="content">			
			<div class="rev_slider_wrapper">
				<!-- START REVOLUTION SLIDER 5.0 auto mode -->
				<div id="rev_slider" class="rev_slider fullwidthabanner" style="display:none;" data-version="5.0">
					<ul>	
					<?php foreach ($tweets as $tweet): 
							$image_url_array = TP_twitter::array_find_element_by_key("media",$tweet);
      						$image_url_large = TP_twitter::array_find_element_by_key("large",$image_url_array);
      						$image_url = array(TP_twitter::array_find_element_by_key("media_url",$image_url_array),TP_twitter::array_find_element_by_key("w",$image_url_large),TP_twitter::array_find_element_by_key("h",$image_url_large));
					?>
						<!-- SLIDE  -->
						<li data-index="rs-<?php echo $tweet['id']; ?>" data-transition="scaledownfromleft" data-slotamount="default"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="<?php echo $image_url[0]; ?>"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="" data-param1=" <?php echo $tweet["user"]["screen_name"]; ?> - <?php $date = new DateTime($tweet['created_at']); echo $date->format('F d, Y'); ?>" data-param2="<?php echo $tweet['text']; ?>" data-description="">
							<!-- MAIN IMAGE -->
							<img src="../../assets/images/dummy.png"  alt=""  data-lazyload="<?php echo $image_url[0]; ?>" data-bgposition="center center" data-bgfit="contain" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->

							<!-- LAYER NR. 1 -->
							<!-- TWITTER CONTENT -->
							<div class="tp-caption Twitter-Content  " 
								id="slide-<?php echo $tweet['id']; ?>-layer-6" 
								data-x="10" 
								data-y="bottom" 
								data-voffset="10" 
								data-width="['720']"
								data-height="['210']"
								data-transform_idle="o:1;"
					 
								data-transform_in="y:[110%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;s:2000;e:Power4.easeInOut;" 
								data-transform_out="y:[175%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;" 
								data-start="500" 
								data-splitin="none" 
								data-splitout="none" 
								data-basealign="slide" 
								data-responsive_offset="off" 

								data-end="bytrigger"
								data-lasttriggerstate="reset"
								style="z-index: 5; min-width: 720px; min-height: 210px; white-space: normal; max-width: 720px; max-height: 210px; font-size: 26px; line-height: 32px; font-weight: 300; color: rgba(41, 47, 51, 1.00);font-family:Roboto;background-color:rgba(255, 255, 255, 1.00);padding:30px 30px 70px 30px;border-radius:0 0 0 0;"><?php echo TP_twitter::makeClickableLinks($tweet['text']); ?> 
							</div>

							<!-- LAYER NR. 2 -->
							<!-- RETWEET INFO -->
							<div class="tp-caption Twitter-Retweet  " 
								id="slide-<?php echo $tweet['id']; ?>-layer-4" 
								data-x="40" 
								data-y="bottom" data-voffset="30" 
								data-width="['auto']"
								data-height="['auto']"
								data-transform_idle="o:1;tO:-20% 50%;"
					 
								data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;" 
								data-transform_out="y:50px;opacity:0;s:500;e:Power1.easeInOut;s:500;e:Power1.easeInOut;" 
								data-start="850" 
								data-splitin="none" 
								data-splitout="none" 
								data-basealign="slide" 
								data-responsive_offset="off" 
								data-responsive="off"
								data-end="bytrigger"
								data-lasttriggerstate="reset"
								style="z-index: 6; min-width: auto; min-height: auto; white-space: nowrap; max-width: auto; max-height: auto; font-size: 15px; line-height: 22px; font-weight: 500; color: rgba(136, 153, 166, 1.00);font-family:Roboto;background-color:rgba(255, 255, 255, 0);border-radius:0 0 0 0;"><i class="fa-icon-retweet"></i> <?php echo $tweet['retweet_count']; ?> 
							</div>

							<!-- LAYER NR. 3 -->
							<!-- FAVORITE INFO -->
							<div class="tp-caption Twitter-Favorites  " 
								id="slide-<?php echo $tweet['id']; ?>-layer-1" 
								data-x="115" 
								data-y="bottom" 
								data-voffset="30" 
								data-width="['auto']"
								data-height="['auto']"
								data-transform_idle="o:1;tO:-20% 50%;"
					 
								data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;" 
								data-transform_out="y:50px;opacity:0;s:500;e:Power1.easeInOut;s:500;e:Power1.easeInOut;" 
								data-start="850" 
								data-splitin="none" 
								data-splitout="none" 
								data-basealign="slide" 
								data-responsive_offset="off" 
								data-responsive="off"
								data-end="bytrigger"
								data-lasttriggerstate="reset"
								style="z-index: 7; min-width: auto; min-height: auto; white-space: nowrap; max-width: auto; max-height: auto; font-size: 15px; line-height: 22px; font-weight: 500; color: rgba(136, 153, 166, 1.00);font-family:Roboto;background-color:rgba(255, 255, 255, 0);border-radius:0 0 0 0;"><i class="fa-icon-star"></i> <?php echo $tweet['favorite_count']; ?> 
							</div>

							<!-- LAYER NR. 4 -->
							<!-- LINK TO TWEET -->
							<a class="tp-caption Twitter-Link" href="https://twitter.com/<?php echo $twitter_account; ?>/status/<?php echo $tweet['id']; ?>" target="_blank" id="slide-<?php echo $tweet['id']; ?>-layer-2" 
								data-x="185" 
								data-y="bottom" 
								data-voffset="24" 
								data-width="['auto']"
								data-height="['auto']"
								data-transform_idle="o:1;tO:-20% 50%;"
								data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:500;e:Power1.easeInOut;"
								data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(0, 132, 180, 1.00);cursor:pointer;"
					 
								data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;" 
								data-transform_out="y:50px;opacity:0;s:500;e:Power1.easeInOut;s:500;e:Power1.easeInOut;" 
								data-start="850" 
								data-splitin="none" 
								data-splitout="none" 
								data-actions=''
								data-basealign="slide" 
								data-responsive_offset="off" 
								data-responsive="off"
								data-end="bytrigger"
								data-lasttriggerstate="reset"
								style="z-index: 8; min-width: auto; min-height: auto; white-space: nowrap; max-width: auto; max-height: auto; font-size: 15px; line-height: 15px; font-weight: 500; color: rgba(135, 153, 165, 1.00);font-family:Roboto;text-align:center;background-color:rgba(255, 255, 255, 1.00);padding:11px 11px 9px 11px;border-radius:30px 30px 30px 30px;"><i class="fa-icon-chain"></i> 
							</a>

							<!-- LAYER NR. 5 -->
							<!-- LINK TO TWEET HOVER -->
							<div class="tp-caption Twitter-Link  " 
								id="slide-<?php echo $tweet['id']; ?>-layer-8" 
								data-x="10" 
								data-y="10" 
								data-width="['auto']"
								data-height="['auto']"
								data-transform_idle="o:1;tO:-20% 50%;"
								data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:500;e:Power1.easeInOut;"
								data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(0, 132, 180, 1.00);br:30px 30px 30px 30px;cursor:pointer;"
					 
								data-transform_in="opacity:0;s:1500;e:Power3.easeInOut;" 
								data-transform_out="opacity:0;s:1000;e:Power1.easeInOut;s:1000;e:Power1.easeInOut;" 
								data-start="850" 
								data-splitin="none" 
								data-splitout="none" 
								data-actions='[{"event":"click","action":"togglelayer","layerstatus":"visible","layer":"slide-<?php echo $tweet['id']; ?>-layer-6","delay":""},{"event":"click","action":"togglelayer","layerstatus":"visible","layer":"slide-<?php echo $tweet['id']; ?>-layer-4","delay":""},{"event":"click","action":"togglelayer","layerstatus":"visible","layer":"slide-<?php echo $tweet['id']; ?>-layer-1","delay":""},{"event":"click","action":"togglelayer","layerstatus":"visible","layer":"slide-<?php echo $tweet['id']; ?>-layer-2","delay":""}]'
								data-basealign="slide" 
								data-responsive_offset="off" 
								data-responsive="off"
								
								style="z-index: 9; min-width: auto; min-height: auto; white-space: nowrap; max-width: auto; max-height: auto; font-size: 15px; line-height: 15px; font-weight: 500; color: rgba(135, 153, 165, 1.00);font-family:Roboto;text-align:center;background-color:rgba(255, 255, 255, 1.00);padding:10px 11px 9px 11px;border-radius:50px 50px 50px 50px;"><i class="fa-icon-arrows-alt"></i> 
							</div>
						</li>
					<?php endforeach; ?>
					</ul>
					<div class="tp-bannertimer tp-bottom" style="visibility: hidden !important;"></div>	
				</div><!-- END REVOLUTION SLIDER -->		
			</div><!-- ENF OF SLIDER WRAPPER -->	
		</article>
	</section>





	<script>
		var revapi35;
		jQuery(document).ready(function() {
			if(jQuery("#rev_slider").revolution == undefined){
				revslider_showDoubleJqueryError("#rev_slider");
			}else{
				revapi35 = jQuery("#rev_slider").show().revolution({
					sliderType:"standard",
					sliderLayout:"auto",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"on",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
						onHoverStop:"off",
						touch:{
							touchenabled:"on",
							swipe_threshold: 75,
							swipe_min_touches: 1,
							swipe_direction: "horizontal",
							drag_block_vertical: false
						}
						,
						arrows: {
							style:"uranus",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_onleave:true,
							hide_delay:200,
							hide_delay_mobile:99999,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"center",
								h_offset:10,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:10,
								v_offset:0
							}
						}
						,
						tabs: {
							style:"ares",
							enable:true,
							width:350,
							height:80,
							min_width:350,
							wrapper_padding:0,
							wrapper_color:"#f5f5f5",
							wrapper_opacity:"1",
							tmp:'<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{param2}}</span></div><div class="tp-tab-image"></div>',
							visibleAmount: 10,
							hide_onmobile: true,
							hide_under:776,
							hide_onleave:false,
							hide_delay:200,
							direction:"vertical",
							span:true,
							position:"outer-right",
							space:0,
							h_align:"right",
							v_align:"top",
							h_offset:0,
							v_offset:0
						}
					},
					gridwidth:800,
					gridheight:640,
					lazyType:"single",
					shadow:0,
					spinner:"off",
					stopLoop:"on",
					stopAfterLoops:0,
					stopAtSlide:1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					startWithSlide:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:"off",
					}
				});
			}
		});	/*ready*/
	</script>			

	<div class="bottom-history-wrap" style="margin-top:150px">
            <article class="small-history bottom-history"> 
                <i class="fa-icon-question tp-headicon"></i>
                <h2 class="textaligncenter" style="margin-bottom:25px;">Find the Documentation ?</h2>
                <p>We would always recommend to use our<a target="_blank" href="http://www.themepunch.com/revsliderjquery-doc/slider-revolution-jquery-5-x-documentation/"> online documentation</a> however you can find also our embeded local documentation zipped in the Documentation folder.  Online Documentation and FAQ Page is regulary updated. You will find More examples, Visit us also at <a href="http://themepunch.com">http://themepunch.com</a> ! </p>   
                <div class="tp-smallinfo">Learn how to build your Slider!</div>     
                
            </article>

            <article class="small-history bottom-history" style="background:#f5f7f9;">          
                    <i class="fa-icon-arrows tp-headicon"></i>
                    <h2 class="textaligncenter" style="margin-bottom:25px;">Navigation Examples !</h2>
                    <p>You find many Examples for All Skins and Positions of Navigation examples in the <a target="_blank" href="file:../Navigation">examples/Navigation folder</a>. Based on these prepared examples you can build your own navigation skins.  Feel free to copy and paste the markups after your requests in your own documents.</p>
                    <div class="tp-smallinfo">Customize the interaction with your visitor!</div>            
            </article>

            <article class="small-history bottom-history" > 
                <i class="fa-icon-cog tp-headicon"></i>
                <h2 class="textaligncenter" style="margin-bottom:25px;">Layer and Slide Transitions</h2>
                <p>We prepared a small List of Transition and a light weight Markup Builder in the <a target="_blank" href="file:../Transitions"> examples/Transitions folder</a>. This will help you to get an overview how the Slider and Layer Transitions works. Copy the Markups of the generated Slide and Layer Animation Examples and paste it into your own Documents.</p>
                <div class="tp-smallinfo">Eye Catching Effects!</div>
                
            </article>
        </div>
        <div class="clearfix"></div>        
        
        <footer>
            <div class="footer_inner">
                <div class="footerwidget">
                    <h3>Slider Revolution</h3>
                    <a href="http://revolution.themepunch.com/jquery/#features" target="_self">Features</a>
                    <a href="http://revolution.themepunch.com/examples-jquery/" target="_self">Usage Examples</a>
                    <a href="http://www.themepunch.com/revsliderjquery-doc/slider-revolution-jquery-5-x-documentation/" target="_blank">Online Documentation</a>
                </div>
                <div class="footerwidget">
                    <h3>Resources</h3>
                    <a href="http://www.themepunch.com/support-center/" target="_blank">FAQ Database</a>
                    <a href="http://themepunch.com" target="_blank">ThemePunch.com</a>
                    <a href="http://themepunch.us9.list-manage.com/subscribe?u=a5738148e5ec630766e28de16&amp;id=3e718acc63" target="_blank">Newsletter</a>
                    <a href="http://www.themepunch.com/products/" target="_blank">Plugins</a>
                    <a href="http://www.themepunch.com/products/" target="_blank">Themes</a>
                </div>
                <div class="footerwidget">
                    <h3>More Versions</h3>
                    <a href="http://revolution.themepunch.com" target="_blank">WordPress</a>
                    <a href="http://codecanyon.net/item/slider-revolution-responsive-prestashop-module/7140939?ref=themepunch" target="_blank">Prestashop</a>
                    <a href="http://codecanyon.net/item/slider-revolution-responsive-magento-extension/9332896?ref=themepunch" target="_blank">Magento</a>
                    <a href="http://codecanyon.net/item/slider-revolution-responsive-opencart-module/9994648?ref=themepunch" target="_blank">OpenCart</a>
                    <a href="http://codecanyon.net/item/slider-revolution-responsive-drupal-module/12041755?ref=themepunch" target="_blank">Drupal</a>
                </div>
                <div class="footerwidget social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/themepunchofficial" target="_blank" class="so_facebook" data-rel="tooltip" data-animation="false" data-placement="bottom" data-original-title="Facebook"><i class="s_icon fa-icon-facebook 
                        "></i></a></li>
                        <li><a href="https://twitter.com/themepunch" target="_blank" class="so_twitter" data-rel="tooltip" data-animation="false" data-placement="bottom" data-original-title="Twitter"><i class="s_icon fa-icon-twitter"></i></a></li>
                        <li><a href="https://plus.google.com/+ThemePunch/posts" target="_blank" class="so_gplus" data-rel="tooltip" data-animation="false" data-placement="bottom" data-original-title="Google+"><i class="s_icon fa-icon-google-plus"></i></a></li>
                    </ul>               
                </div>
                <div class="clearfix"></div>
            </div>
        </footer>
</body>
</html>