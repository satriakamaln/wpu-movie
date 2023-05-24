function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url : 'http://www.omdbapi.com/',
        type : 'get',
        dataType : 'json',
        data : {
            'apikey' : 'c2595272',
            's' : $('#search-input').val()
        },
        success : function (result) {
            // console.log(result)
            if (result.Response == "True") {

                let movies = result.Search;
                // console.log(movies)

                $.each(movies, function (i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">`+ data.Title +`</h5>
                                <p class="card-text">`+ data.Year +`</p>
                                <a href="#" class="card-link">See Details</a>
                                </div>
                            </div>
                        </div>
                    `)
                })

            } else {
                $('#movie-list').html(`
                    <h1 class="col-md text-center">`+ result.Error +`</h1>
                `)
            }

            $('#search-input').val('');
        }
    })
}

$('#search-button').on('click', function () {
    searchMovie()
})

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie()
    }
})