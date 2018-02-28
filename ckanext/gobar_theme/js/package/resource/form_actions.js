function validLength(length, maxLength) {
    return maxLength >= length;
}

function validTitle(){
    var titleLength = $('input[data-valid-title-length]').val().length;
    var validTitleLength = $('div[data-valid-title-length]').data('valid-title-length')
    return validLength(titleLength, validTitleLength);
}

function validDesc(){
    var descLength = $('textarea[data-valid-desc-length]').val().length
    var validDescLength = $('textarea[data-valid-desc-length]').data('valid-desc-length')
    return validLength(descLength, validDescLength);
}

function validateTitle() {
    $('div#field-name.after-desc').toggleClass('long-field', !validTitle())
}

function validateDesc() {
    $('div#field-description.after-desc').toggleClass('long-field', !validDesc())
}

$(function () {
    var clickCount = 0;
    var clickedPublishButton = false;
    var titleValid = false;
    var hasResources = Number($('form#resource-edit').data('resources-amount')) > 0;

    function errorMessages() {
        var isValid = true;
        var title = $('#field-name');
        var description = $('#field-description');
        var organization = $('#organization-name');
        var errorTemplate = '<div class="missing-field">Completá este dato</div>';
        titleValid = title.val().length > 0;
        var organizationValid;
        var descriptionValid = description.val().length > 0;
        try{
            organizationValid = organization.val().length > 0;
        }
        catch (err){
            organizationValid = true
        }

        if (!titleValid) {
            isValid = false;
            title.after(errorTemplate);
            window.scrollTo(0, 0);
        }
        if (!descriptionValid) {
            isValid = false;
            description.after(errorTemplate);
            window.scrollTo(0, 0);
        }
        if (!organizationValid) {
            isValid = false;
            organization.after(errorTemplate);
        }
        return isValid;
    }

    function formIsValid() {
        $('.missing-field').remove();
        return errorMessages();
    }

    $('form#resource-edit').submit(function () {
        return formIsValid();
    });

    $('button#again-button').on('click', function(){
        clickCount++;
    });

    $('button#draft-button').on('click', function(){
        clickCount++;
    });

    $('button#publish-button').on('click', function(){
        clickCount++;
        clickedPublishButton = true;
    });

    $(document).ready(function(){
        validateTitle()
        $('input[data-valid-title-length]').on('change input keyup', validateTitle)

        validateDesc()
        $('textarea[data-valid-desc-length]').on('change input keyup', validateDesc)
    });
});

$('form#resource-edit').on('submit', function () {
    var input_file_name = $('#form-file-name');
    if (input_file_name.css("display") === 'none'){
        input_file_name.val($('#field-image-url').val());
    }
});

function display_filename_input(){
    $('#form-file-name').css("display", "inline-block")
}