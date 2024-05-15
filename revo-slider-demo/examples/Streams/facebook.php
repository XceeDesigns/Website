<?php
	// FACEBOOK CONNECT STREAM CLASS
	require_once '../../revolution/php/facebook/class-facebook.php';
	$facebook = new TP_facebook();

	// FACEBOOK PAGE
	$user_id = $facebook->get_user_from_url('https://www.facebook.com/inspirationfeed');

	// API DATA
	// Create App ID and Secret -> https://developers.facebook.com/apps/?action=create
	$app_id = 'YOUR_APP_ID';
	$app_secret = 'YOUR_APP_SECRET';

	// GET POSTS
	$post_feed = $facebook->get_post_feed($user_id,$app_id,$app_secret,5);
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
        <p>This examples loads a PHP class that automatically populates the slider by a Facebook Page Timeline.</p>
		<p>We are using the basic libraries of Slider Revolution, just like the standard style sheets and some Google Fonts.</p>
		<hr>	
		<ul>
			<li>Enter the URL of the Facebook Page in the first PHP block: <br>
				<pre>$user_id = $facebook->get_user_from_url('https://www.facebook.com/inspirationfeed');</pre><br></li>
			<li><a href="https://developers.facebook.com/apps/?action=create">Create</a> your Facebook App to get your App ID and Secret and enter there too:<br>
				<pre>$app_id = '1898...';
	$app_secret = '80d0a61b19852...';</pre>
			</li>
		</ul>           
    </article>

	<section class="example">
		<article class="content">			
			<div id="rev_slider_wrapper" class="rev_slider_wrapper fullwidthbanner-container" style="margin:0px auto;background-color:#dddddd;padding:0px;margin-top:0px;margin-bottom:0px;">
			<!-- START REVOLUTION SLIDER 5.0 auto mode -->
				<div id="rev_slider" class="rev_slider fullwidthabanner" style="display:none;" data-version="5.0">
					<ul>	<!-- SLIDE  -->
					<?php 
						foreach ($post_feed as $post) :
							if($post->status_type!="wall_post") :
								//var_dump($post);
								
								// get normal sized image
								if(!empty($post->object_id)){
									$image_url = 'https://graph.facebook.com/'.$post->object_id.'/picture';//$post->picture;
								}
								elseif (!empty($post->picture)) {
									$image_url = TP_facebook::decode_facebook_url($post->picture);
									$image_url = parse_str(parse_url($image_url, PHP_URL_QUERY), $array);
									$image_url = explode('&', $array['url']);
									$image_url = $image_url[0];
								}
					?>
								<li data-index="rs-<?php echo $post->id; ?>" data-transition="scaledownfromleft" data-slotamount="default"  data-easein="default" data-easeout="default" data-masterspeed="1500"  data-thumb="<?php echo $image_url; ?>"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="" data-param1="<?php $date = new DateTime($post->updated_time); echo $date->format('F d, Y'); ?>" data-param2="<?php echo $post->message; ?>" data-description="">
								<!-- MAIN IMAGE -->
									<img src="../../assets/images/dummy.png"  alt="" data-lazyload="<?php echo $image_url; ?>" data-bgposition="center center" data-bgfit="contain" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>

									<!-- LAYERS -->
									<!-- LAYER NR. 1 -->
									<div class="tp-caption Facebook-Likes" 
										id="slide-<?php echo $post->id; ?>-layer-1" 
										data-x="10" 
										data-y="bottom" 
										data-voffset="10" 
										data-width="['90']"
										data-height="['32']"
										data-transform_idle="o:1;tO:-20% 50%;"
							 
										data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;" 
										data-transform_out="opacity:0;s:700;e:Power1.easeInOut;s:700;e:Power1.easeInOut;" 
										data-start="500" 
										data-splitin="none" 
										data-splitout="none" 
										data-basealign="slide" 
										data-responsive_offset="off" 
										data-responsive="off"
										
										style="z-index: 5; min-width: 90px; min-height: 32px; white-space: normal; max-width: 90px; max-height: 32px; font-size: 15px; line-height: 22px; font-weight: 500; color: rgba(255, 255, 255, 1.00);font-family:Roboto;text-align:center;background-color:rgba(59, 89, 153, 1.00);padding:5px 15px 5px 15px;border-radius:0 0 0 0;">
										<i class="fa-icon-thumbs-o-up"></i> <?php echo isset($post->likes->data) ? sizeof($post->likes->data) : 0 ; ?>
									</div>

									<!-- LAYER NR. 2 -->
									<a class="tp-caption Facebook-Likes" 
										href="<?php echo $post->link; ?>" target="_blank" id="slide-<?php echo $post->id; ?>-layer-2" 
										data-x="105" 
										data-y="bottom" 
										data-voffset="10" 
										data-width="['45']"
										data-height="['32']"
										data-transform_idle="o:1;tO:-20% 50%;"
										data-transform_hover="o:1;rX:0;rY:0;rZ:0;z:0;s:500;e:Power1.easeInOut;"
										data-style_hover="c:rgba(255, 255, 255, 1.00);bg:rgba(0, 0, 0, 1.00);cursor:pointer;"
							 
										data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;" 
										data-transform_out="opacity:0;s:700;e:Power1.easeInOut;s:700;e:Power1.easeInOut;" 
										data-start="500" 
										data-splitin="none" 
										data-splitout="none" 
										data-actions=''
										data-basealign="slide" 
										data-responsive_offset="off" 
										data-responsive="off"
										
										style="z-index: 6; min-width: 45px; min-height: 32px; white-space: normal; max-width: 45px; max-height: 32px; font-size: 15px; line-height: 22px; font-weight: 500; color: rgba(0, 0, 0, 1.00);font-family:Roboto;text-align:center;background-color:rgba(255, 255, 255, 1.00);padding:5px 15px 5px 15px;border-radius:0 0 0 0;"><i class="fa-icon-chain"></i> 
									</a>
								</li>
					<?php
							endif;
						endforeach;
					?>
					</ul>
					<div class="tp-bannertimer tp-bottom" style="visibility: hidden !important;"></div>	
						</div><!-- ENF OF SLIDER WRAPPER -->	
					</article>
	</section>


	



	<script type="text/javascript">

		var revapi24;
		jQuery(document).ready(function() {
			if(jQuery("#rev_slider").revolution == undefined){
				revslider_showDoubleJqueryError("#rev_slider");
			}else{
				revapi24 = jQuery("#rev_slider").show().revolution({
					sliderType:"standard",
					//jsFileLocation:"../../revolution/js",
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
							style:"gyges",
							enable:true,
							hide_onmobile:false,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"right",
								v_align:"bottom",
								h_offset:40,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"bottom",
								h_offset:0,
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