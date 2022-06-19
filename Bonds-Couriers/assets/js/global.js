(function( $ ){

    $(document).ready( function() {
        customSelectBox();
        subMenu();
        datepicker();

        // add to job
        $("#add-to-job").on("click", function(){
            var wrapper = $(".add-job-wrapper");
            var html = '<div class="manage-job">' +
            '<div class="title">Manage Job Notifications</div>' +
            '<div class="col-two-field">' +
                '<div class="bonds-field col-2">' +
                    '<label>Job Status Messaging</label>' +
                    '<select class="bonds-manage-job-select select-hidden"' +
                        'name="eBook[0][bond_manage_job]">' +
                        '<option value="pod" selected>POD</option>' +
                        '<option value="pickedup">Picked up</option>' +
                        '<option value="delay">Driver Delay</option>' +
                        '<option value="confirm">Confirm Job Booking</option>' +
                    '</select>' +
                '</div>' +
                '<div class="bonds-field col-2">' +
                    '<label>Email / Mobile</label>' +
                    '<select class="bonds-email-phone-select select-hidden"' +
                        'name="eBook[0][bond_email_phone]">' +
                        '<option value="1" selected>Value 1</option>' +
                        '<option value="2">Value 2</option>' +
                        '<option value="3">Value 3</option>' +
                        '<option value="4">Value 4</option>' +
                    '</select>' +
                '</div>' +
            '</div>' +
        '</div>';

        wrapper.append(html);
        customSelectBox();
        });

        $("#remove-to-job").on("click", function(){
            var wrapper = $(".add-job-wrapper");
            wrapper.find(".manage-job").each(function( index ) {
                if ((index+1) == wrapper.find(".manage-job").length) {
                    $(this).remove();
                }
            });
        });
    });
    
    // Cusom select box to style
    function customSelectBox() {
        // Iterate over each select element
        $('select').each(function () {
            // Cache the number of options
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;
    
            $this.addClass('select-hidden'); // Hides the select element
            $this.wrap('<div class="custom-select-wrap"></div>'); // Wrap the select element in a div
            $this.after('<div class="custom-select"></div>'); // Insert a styled div to sit over the top of the hidden select element
            let $custom_select = $this.next('div.custom-select'); // Cache the styled div
            $custom_select.text($this.children('option').eq(0).text()); // Show the first select option in the styled div
    
            // Insert an unordered list after the styled div and also cache the list
            let $list = $('<ul />', { 'class': 'options' }).insertAfter($custom_select);
            // Insert a list item into the unordered list for each select option
            for (let i = 0; i < numberOfOptions; i++) {
                let $rel_val = $this.children('option').eq(i).val();
                let $opts_cl = (i == 0) ? "selected" : "";
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $rel_val,
                    class: $opts_cl
                }).appendTo($list);
            }
            // Cache the list items
            let $listItems = $list.children('li');
            // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
            $custom_select.click(function (e) {
                e.stopPropagation();
                if(!$(this).hasClass('active')){
                    $('div.custom-select.active').each(function () {
                        $(this).removeClass('active').next('ul.options').hide();
                    });
                }
                $(this).toggleClass('active').next('ul.options').toggle();
            });
            // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
            // Updates the select element to have the value of the equivalent option
            $listItems.click(function (e) {
                e.stopPropagation();
                $custom_select.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel')).change();
                $list.children('li').removeClass('selected');
                $(this).addClass('selected');
                $list.hide();
                /* alert($this.val()); Uncomment this for demonstration! */
            });
            // Hides the unordered list when clicking outside of it
            $(document).click(function () {
                $custom_select.removeClass('active');
                $list.hide();
            });
    
        });
    }
    
    function subMenu(){
        if( $(window).width() > 1200 ){
            $('.item.has-children-menu').click( function(e) {
                e.preventDefault();
    
                $(this).toggleClass('active');
            });
        }else{
            $('.item.has-children-menu').click( function(e) {
                e.preventDefault();
    
                $(this).find('.sub-menu').slideToggle();
            });
        }
        
    }

    function datepicker(){
        $('#datepicker').datepicker({
            format: 'dd-mm-yyyy',
            startDate: '-3d',
            autoclose: true,
            calendarWeeks : true,
            clearBtn: true,
            disableTouchKeyboard: true
        });

        $('#timepicker').datetimepicker({
            format: 'HH:mm',
            autoclose:true
        });
    }
    
    
    })( jQuery );