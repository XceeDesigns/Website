<?php
// FLICKR CONNECT STREAM CLASS
require_once '../../revolution/php/flickr/class-flickr.php';

// FLICKR USER URL
$user_url = 'https://www.flickr.com/photos/wyncliffe/';

// API DATA
# get flickr key -> http://weblizar.com/get-flickr-api-key/
$api_key = 'YOUR_API_KEY';

// GET PHOTOS
$flickr = new TP_flickr($api_key);
$user_id = $flickr->get_user_from_url($user_url);
$photos = $flickr->get_public_photos($user_id,15);
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
	<link rel="stylesheet" type="text/css"href="http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" >
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
	<script type="text/javascript" src="../../revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/revolution.extension.actions.min.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/revolution.extension.navigation.min.js"></script>

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
        <p>This examples loads a PHP class that automatically populates the slider by public Flickr User Photos.</p>
		<p>We are using the basic libraries of Slider Revolution, just like the standard style sheets and some Google Fonts.</p>
		<hr>		
		<ul>
			<li>Enter the URL of the Flickr user in the first PHP block: <br>
				<pre>$user_url = 'https://www.flickr.com/photos/wyncliffe/';</pre><br></li>
			<li><a href="http://weblizar.com/get-flickr-api-key/">Get</a> your Flicker API key and put in there too:<br>
				<pre>$api_key = 'e66dd09c0b2803...';</pre>
			</li>
		</ul>          
    </article>

	<section class="example">
		<article class="content">			
			<div id="rev_slider_wrapper" class="rev_slider_wrapper fullwidthbanner-container" style="margin:0px auto;background-color:#000000;padding:0px;margin-top:0px;margin-bottom:0px;">
			<!-- START REVOLUTION SLIDER 5.0.4.1 auto mode -->
				<div id="rev_slider" class="rev_slider fullwidthabanner" style="display:none;" data-version="5.0.4.1">
					<ul>	<!-- SLIDE  -->
					<?php foreach ($photos as $photo) : 
							//var_dump($photo);
					?>
						<li data-index="rs-<?php echo $photo->id; ?>" data-transition="scaledownfrombottom" data-slotamount="7"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="<?php echo $photo->url_l; ?>"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="<?php echo $photo->title; ?>" data-param1="<?php echo $photo->datetaken; ?>" data-description="">
							<!-- MAIN IMAGE -->
							<img src="../../assets/images/dummy.png"  alt=""  data-lazyload="<?php echo $photo->url_l; ?>" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->
							<!-- LAYER NR. 1 -->
							<a class="tp-caption WebProduct-Menuitem  " 
					 			href="<?php echo 'http://flic.kr/p/'.TP_flickr::base_encode($photo->id);?>" target="_blank"			 
					 			id="slide-<?php echo $photo->id; ?>-layer-1" 
								data-x="20" 
								data-y="bottom" 
								data-voffset="20" 
								data-width="['auto']"
								data-height="['auto']"
								data-transform_idle="o:1;"
								data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:200;e:Linear.easeNone;"
								data-style_hover="c:rgba(0, 0, 0, 1.00);bg:rgba(255, 255, 255, 1.00);cursor:pointer;"
					 
								data-transform_in="x:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;s:1500;e:Power3.easeInOut;" 
								data-transform_out="x:[-100%];s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;" 
								data-mask_in="x:0px;y:0px;" 
								data-mask_out="x:inherit;y:inherit;" 
								data-start="0" 
								data-splitin="none" 
								data-splitout="none" 
								data-actions=''
								data-basealign="slide" 
								data-responsive_offset="on" 
								data-responsive="off"
								
								style="z-index: 5; min-width: auto; min-height: auto; white-space: nowrap; max-width: auto; max-height: auto; font-size: 20px; line-height: 30px; font-weight: 500; color: rgba(255, 255, 255, 1.00);font-family:Raleway;background-color:rgba(0, 0, 0, 0.50);padding:3px 5px 3px 8px;border-radius:10px 10px 10px 10px;">
								<i class="fa-icon-photo"></i> 
							</a>
						</li>
					<?php endforeach; ?>
					</ul>
					<div class="tp-bannertimer tp-bottom" style="visibility: hidden !important;"></div>	
				</div>
			</div><!-- ENF OF SLIDER WRAPPER -->	
		</article>
	</section>



	<script>

		var revapi23;
		jQuery(document).ready(function() {
			if(jQuery("#rev_slider").revolution == undefined){
				revslider_showDoubleJqueryError("#rev_slider");
			}else{
				revapi23 = jQuery("#rev_slider").show().revolution({
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
							style:"hesperiden",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_onleave:true,
							hide_delay:200,
							hide_delay_mobile:200,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"center",
								h_offset:20,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:20,
								v_offset:0
							}
						}
						,
						thumbnails: {
							style:"gyges",
							enable:true,
							width:60,
							height:60,
							min_width:60,
							wrapper_padding:5,
							wrapper_color:"#222222",
							wrapper_opacity:"1",
							tmp:'<span class="tp-thumb-img-wrap">  <span class="tp-thumb-image"></span></span>',
							visibleAmount:5,
							hide_onmobile:false,
							hide_over:777,
							hide_onleave:false,
							direction:"vertical",
							span:true,
							position:"outer-left",
							space:5,
							h_align:"left",
							v_align:"top",
							h_offset:0,
							v_offset:0
						}
						,
						tabs: {
							style:"gyges",
							enable:true,
							width:300,
							height:80,
							min_width:300,
							wrapper_padding:30,
							wrapper_color:"#222222",
							wrapper_opacity:"1",
							tmp:'<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
							visibleAmount: 10,
							hide_onmobile: true,
							hide_under:778,
							hide_onleave:false,
							hide_delay:200,
							direction:"vertical",
							span:true,
							position:"outer-left",
							space:0,
							h_align:"left",
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