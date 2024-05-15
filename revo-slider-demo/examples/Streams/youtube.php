<?php
// YOUTUBE CONNECT STREAM CLASS
require_once '../../revolution/php/youtube/class-youtube.php';

// YOUTUBE PLAYLIST ID
$playlist_id = 'PLpVg7pgd-JzNuLKxscJYVLpk__2hmMexB';

// API DATA
$api_key = 'YOUR_API_KEY';
$channel_id = 'UCnXmOkQ9MuCFeqOq2bLHgPQ';

// GET VIDEOS
$youtube = new TP_youtube($api_key,$channel_id);
$videos = $youtube->show_playlist_videos($playlist_id,15);

// CURRENT DOMAIN FOR TRUSTED ORIGIN
$origin = (empty($_SERVER['HTTPS'])) ? 'http' : 'https';
$origin .= '://'.$_SERVER['HTTP_HOST'];

// AUTOPLAY FIRST ELEMENT
$autoplay = "on";
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
	<link href="http://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet" property="stylesheet" type="text/css" media="all" />
	<link href="http://fonts.googleapis.com/css?family=Raleway:500" rel="stylesheet" property="stylesheet" type="text/css" media="all" />
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
	<script type="text/javascript" src="../../revolution/js/extensions/revolution.extension.video.min.js"></script>
	<script type="text/javascript" src="../../revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
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
        <p>This examples loads a PHP class that automatically populates the slider by a YouTube Playlist.</p>
		<p>We are using the basic libraries of Slider Revolution, just like the standard style sheets and some Google Fonts.</p>
		<hr>		
		<ul>
			<li>Enter the playlist ID (take from URL) in the first PHP block (Example Playlist: https://www.youtube.com/playlist?list=PLpVg7pgd-JzNuLKxscJYVLpk__2hmMexB):<br>
				<pre>$playlist_id = 'PLpVg7pgd-JzNuLKxscJYVLpk__2hmMexB';</pre>
			</li>
			<li><a href="https://support.google.com/youtube/answer/3250431?hl=en">Get</a> your YouTube API Key and Channel ID to enter there too:<br>
				<pre>$api_key = 'AIzaSyC6zmOZAuK...';
				$channel_id = 'UCnXmOkQ9...';</pre>
			</li>
		</ul>       
    </article>

	<section class="example">
		<article class="content">			
			<div id="rev_slider_wrapper" class="rev_slider_wrapper fullwidthbanner-container" style="margin:0px auto;background-color:#000000;padding:0px;margin-top:0px;margin-bottom:0px;">
			<!-- START REVOLUTION SLIDER 5.0.4.1 auto mode -->
				<div id="rev_slider" class="rev_slider fullwidthabanner" style="display:none;" data-version="5.0.4.1">
					<ul>	
					<?php foreach ($videos as $video) : 
							//var_dump($video);
					?>
						<!-- SLIDE  -->
						<li data-index="rs-<?php echo $video->snippet->resourceId->videoId; ?>" data-transition="scaledownfrombottom" data-slotamount="7"  data-easein="Power3.easeInOut" data-easeout="Power3.easeInOut" data-masterspeed="1500"  data-thumb="<?php echo $video->snippet->thumbnails->medium->url; ?>"  data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off"  data-title="<?php echo $video->snippet->title; ?>" data-param1="<?php echo $video->snippet->publishedAt; ?>" data-description="">
							<!-- MAIN IMAGE -->
							<img src="<?php echo $video->snippet->thumbnails->maxres->url; ?>"  alt=""  data-bgposition="center center" data-bgfit="100% 0%" data-bgrepeat="no-repeat" class="rev-slidebg" data-no-retina>
							<!-- LAYERS -->

							<!-- LAYER NR. 1 -->
							<div class="tp-caption   tp-resizeme tp-videolayer" 
								id="slide-<?php echo $video->snippet->resourceId->videoId; ?>-layer-2" 
								data-x="center" 
								data-hoffset="" 
								data-y="center" 
								data-voffset="" 
								data-width="['auto']"
								data-height="['auto']"
								data-transform_idle="o:1;"
					 
								data-transform_in="opacity:0;s:300;e:Power2.easeInOut;" 
								data-transform_out="opacity:0;s:300;s:300;" 
								data-start="500" 
								data-responsive_offset="on" 

								data-ytid="<?php echo $video->snippet->resourceId->videoId; ?>" 
								data-videoattributes="version=3&amp;enablejsapi=1&amp;html5=1&amp;volume=100&hd=1&amp;wmode=opaque&amp;showinfo=0&amp;ref=0;;origin=<?php echo $origin; ?>;" 
								data-videorate="1" 
								data-videowidth="1230px" 
								data-videoheight="692px" 
								data-videocontrols="controls"
								data-videoloop="none"			
								data-autoplay="<?php echo $autoplay; $autoplay="off"; //force off from second video on ?>" 
								data-nextslideatend="true" 
								data-volume="100" data-forcerewind="on"
								style="z-index: 5;padding:0 0 0 0;border-radius:0 0 0 0;"> 
							</div>
						</li>
					<?php endforeach; ?>
					</ul>
					<div class="tp-bannertimer tp-bottom" style="visibility: hidden !important;"></div>	
				</div>
			</div><!-- ENF OF SLIDER WRAPPER -->	
		</article>
	</section>





	<script>
		var revapi21;
		jQuery(document).ready(function() {
			if(jQuery("#rev_slider").revolution == undefined){
				revslider_showDoubleJqueryError("#rev_slider");
			}else{
				revapi21 = jQuery("#rev_slider").show().revolution({
					sliderType:"standard",
					sliderLayout:"auto",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
						onHoverStop:"off",
						arrows: {
							style:"uranus",
							enable:true,
							hide_onmobile:true,
							hide_under:778,
							hide_onleave:true,
							hide_delay:200,
							hide_delay_mobile:1200,
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
							style:"erinyen",
							enable:true,
							width:200,
							height:113,
							min_width:170,
							wrapper_padding:30,
							wrapper_color:"#333333",
							wrapper_opacity:"1",
							tmp:'<span class="tp-thumb-over"></span><span class="tp-thumb-image"></span><span class="tp-thumb-title">{{title}}</span><span class="tp-thumb-more"></span>',
							visibleAmount:10,
							hide_onmobile:false,
							hide_onleave:false,
							direction:"horizontal",
							span:true,
							position:"outer-bottom",
							space:20,
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:0
						}
					},
					gridwidth:1230,
					gridheight:692,
					lazyType:"none",
					shadow:0,
					spinner:"spinner2",
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