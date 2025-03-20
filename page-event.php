<?php
/*
Template Name: Event
*/
wp_head();

if (isset($_GET['event_id'])) {
    $event_id = intval($_GET['event_id']); // Безопасно получаем ID
}
?>
<div class="wrapper">
    <?php include 'includes/header.php';?>
    <div class="event" data-event-id="<?php echo $event_id;?>">
        <div class="" style="color:#fff;font-size:24px;">
        </div>
    </div>
    <?php include 'includes/footer.php' ?>
</div>

<?php wp_footer(); ?>
