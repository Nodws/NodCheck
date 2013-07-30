$(document).ready(function () {
    var ch_box = '<div class="c_box"></div>', 
        list_btn = '<div class="edit_box"><input class="del" type="button" value="delete" /></div>'; 


    $('#text').on('keyup', function () {
        if ($(this).val().length == 0) {
            $('.btn').removeClass('on_btn').addClass('off_btn'); 
        } else {
            $('.btn').removeClass('off_btn').addClass('on_btn'); 
        }
    }); 

    $('.btn').on('click', function (event) {
        if ($('.btn').is('.on_btn')) {
            var key = 'item' + localStorage.length;
            $('#list').append('<li class="' + key + '">' + ch_box + '<p class="list_text">' + $('#text').val() + '</p>' + list_btn + '</li>');
            localStorage.setItem(key, $('.' + key).html());
            $('.btn').removeClass('on_btn').addClass('off_btn');
            $('#text').val('');
            notify();
        } else {
            event.preventDefault();
        }
    }); 

    $('body').on('keyup', function (event) {
        if ($('.btn').is('.on_btn') && event.which == 13) {
            var key = 'item' + localStorage.length;
            $('#list').append('<li class="' + key + '">' + ch_box + '<p class="list_text">' + $('#text').val() + '</p>' + list_btn + '</li>');
            localStorage.setItem(key, $('.' + key).html());
            $('.btn').removeClass('on_btn').addClass('off_btn');
            $('#text').val('');
            notify();
        } else {
            event.preventDefault();
        }
    }); 

    $('#list').on('click', '.c_box', function () {
        $(this).toggleClass('checked');
        var checked_item = $(this).parent('li').attr('class');
        localStorage.setItem(checked_item, $(this).parent('li').html());
    }); 

    $('#list').on('click', 'p', function () {
        $(this).parent('li').children('.edit_box').fadeToggle('fast');
        $(this).toggleClass('act');
    }); 

    $('#list').on('click', '.del', function () {
        $(this).parents('li').remove();
        var del_item = $(this).parents('li').attr('class');
        localStorage.removeItem(del_item);
        notify();
    }); 

    $('.reset').click(function () {
        if (localStorage.length == 0) {
            return false;
        } else {
            if (confirm('Are you sure?')) {
                $('#list').children().remove();
                localStorage.clear();
                location.reload();
                notify();
            } else {
                return false;
            };
        };
    }); 

    function notify() {
        chrome.browserAction.setBadgeText({
           text: localStorage.length ? 'on' : 'off'
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: localStorage.length ? '#82247d' : '#999'
        });
}; 
//Magic!
function update() {
    $('#list').children().remove();
    for (var i = 0; i < localStorage.length; i++) {
        var items = localStorage.key(i);
        $('#list').append('<li class="' + items + '">' + localStorage.getItem(items) + '</li>');
    };
};

update();
notify();
});

