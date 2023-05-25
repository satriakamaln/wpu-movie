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
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Details</a>
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

$('#movie-list').on('click', '.see-detail', function () {
    
    $.ajax({
        url : 'http://www.omdbapi.com/',
        dataType : 'json',
        type : 'get',
        data : {
            'apikey' : 'c2595272',
            'i' : $(this).data('id')
        },
        success : function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                    <li class="list-group-item">Year : `+ movie.Released +`</li>
                                    <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                                    <li class="list-group-item">Runtime : `+ movie.Runtime +`</li>
                                    <li class="list-group-item">Director : `+ movie.Genre +`</li>
                                    <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                                    <li class="list-group-item">Writer : `+ movie.Writer +`</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                `)
            }
        }
    })
})
