$(function () {
    let table = $('#phone-book-table').DataTable({
        "columnDefs": [
            {
                "targets": [0, 1],
                "orderDataType": "dom-text",
                render: function (data, type, full, meta) {
                    if (type === 'filter' || type === 'sort') {
                        let api = new $.fn.dataTable.Api(meta.settings);
                        let td = api.cell({row: meta.row, column: meta.col}).node();
                        data = $('input[type="text"]', td).val();
                    }
                    return data;
                }
            }
        ],
    });

    table.on('click', '.delete-button', function () {
        let id = $(this).attr('data-id');
        let row = $(this).closest('tr')
        $.ajax({
            type: "POST",
            url: "backend/ajax/delete.php",
            data: {id: id},
            success: function () {
                table.row(row).remove().draw();
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
                clone.find(".phone-input").attr("value", phone);
                clone.find(".surname-input").attr("value", surname);
                clone.find(".delete-button").attr("data-id", data.id);
                clone.find(".update-button").attr("data-id", data.id);
                table.row.add(clone).draw();

                table.order([0, 'asc']).draw();
            },
            error: function () {
                $("#success-message").addClass("d-none");
                $("#error-message").removeClass("d-none");
            }
        })
    });

    table.on("click", ".change-button", function () {
        $(this).hide();
        $(this).closest('tr').find('input').removeAttr("disabled");
        $(this).closest('tr').find('.update-button').show();
    });

    table.on("click", ".update-button", function () {
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
                $("#success-message").removeClass("d-none");
                $("#error-message").addClass("d-none");
                table.order([0, 'asc']).draw();
            },
            error: function () {
                $("#success-message").addClass("d-none");
                $("#error-message").removeClass("d-none");
            }
        })
    });
});