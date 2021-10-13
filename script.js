$(function () {
    $("#delete-product-btn").on("click", function () {
        let data = [];
        $("input:checkbox:checked").each(function () {
            data.push($(this).attr('value'));
        });

        $.ajax({
            type: "POST",
            url: "backend/ajax/delete.php",
            data: {ids: JSON.stringify(data)},
        }).done(function () {
            $("input:checkbox:checked").closest('.card').remove();
        });
    });

    $("#insert-form").on("submit", function (e) {
        e.preventDefault()
        let phone = $("#phone").val();
        let surname = $("#surname").val();

        $.ajax({
            type: "POST",
            url: "/backend/ajax/insert.php",
            data: {phone: phone, surname: surname},
            success: function (feedback) {
                // todo add new row
                // todo add success message
            },
            error: function () {
                // todo add error message
            }
        })
    });
});