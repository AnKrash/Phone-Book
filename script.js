$(function () {
    $(document).on("click", ".delete-button", function () {
        let id = $(".delete-button").attr('data-id');
        let row = $(this).parents('tr:first')
        $.ajax({
            type: "POST",
            url: "backend/ajax/delete.php",
            data: {id: id},
            success: function () {
                $(row).remove();
            },
        })
    });

    $("#insert-form").on("submit", function (e) {
        e.preventDefault()
        let phone = $("#phone").val();
        let surname = $("#surname").val();
        $("#insert-form")[0].reset();
        $.ajax({
            type: "POST",
            url: "/backend/ajax/insert.php",
            dataType: "json",
            data: {phone: phone, surname: surname},
            success: function (data) {
                $("#success-message").removeClass("d-none");
                $("#error-message").addClass("d-none");
                let clone = $("#row-clone").clone();
                clone.removeClass("d-none").removeAttr("id");
                clone.find(".phone-input").val(phone);
                clone.find(".surname-input").val(surname);
                clone.find(".delete-button").attr("data-id", data.id);
                clone.find(".update-button").attr("data-id", data.id);

                $("#phone-book-table").append(clone);
            },
            error: function () {
                $("#success-message").addClass("d-none");
                $("#error-message").removeClass("d-none");
            }
        })
    });

    $(document).on("click", ".change-button", function () {
        $(this).hide();
        $(this).closest('tr').find('input').removeAttr("disabled");
        $(this).closest('tr').find('.update-button').show();
    });

    $(document).on("click", ".update-button", function () {
        let button = $(this);
        let id = button.attr('data-id');
        let phone = button.closest("tr").find(".phone-input").val();
        let surname = button.closest("tr").find(".surname-input").val();
        $.ajax({
            type: "POST",
            url: "backend/ajax/update.php",
            data: {id: id, phone: phone, surname: surname},
            success: function () {
                button.closest('tr').find('input').attr("disabled", "disabled");
                button.closest('tr').find('.change-button').show();
                button.closest('tr').find('.update-button').hide();
            },
        })
    });
});