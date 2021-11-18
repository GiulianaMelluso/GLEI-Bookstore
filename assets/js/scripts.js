
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});

	//let productoBase = $(".plantilla .producto");
    let libros;

    function descargar_productos() {
		let baseModal = $(".plantilla-modal");
        console.log("BUSCANDO PRODUCTOS");

        $.ajax({
            url: 'https://my-json-server.typicode.com/ivanperazzo/glei-api-server/libros',
            type: 'GET',
            dataType: 'json',

            success: function(data){ // Funcion de callback
                console.log("RESPUESTA OK");
                libros = data;
                console.log(libros);
                for (libro of data) {
                    let nuevoModal = baseModal.clone();
					nuevoModal.find(".modal.fade").attr('id', libro.isbn);
					console.log(nuevoModal.find(".modal.fade").attr('id', libro.isbn));
                    nuevoModal.find(".modal-title").text(libro.titulo);
                    nuevoModal.find(".card-text.editorial").text(libro.editorial);
                    nuevoModal.find(".card-text.fechapub").text(libro.fecha_publicacion);
                    nuevoModal.find(".card-text.tipoenc").text(libro.encuadernacion);
                    nuevoModal.find(".card-text.idioma").text(libro.idioma);
                    nuevoModal.find(".card-text.paginas").text(libro.paginas);
                    nuevoModal.find(".card-text.isbn").text(libro.isbn);
                    nuevoModal.find(".card-text.sinopsis").text(libro.sinopsis);


                    nuevoModal.find(".card-img").attr({src:'assets/img/Libros/'+libro.portada,title:libro.titulo,alt:libro.titulo});

                    $("#modales").append(nuevoModal);
                }
            },

            error: function(request, error) {
                console.log("Ocurrio un error: " + error);
            }
        });
    }

    descargar_productos();

    function MostrarPorCategoria(categoria){
        $(".mostrar-libros-"+categoria).empty();
        // Loop on JSON.Products
        for (libro of libros) {
            // Compare to libro instead of this
            if(categoria == libro.categoria.toLowerCase()) {
                console.log(libro)
                $('<div/>', {'class':'libro-tarjeta-2'}).append(
                    $('<img>').attr({src:'assets/img/Libros/'+libro.portada,title:libro.titulo,alt:libro.titulo,class:'img img-responsive'}),
                    $('<div/>', {'class':'libro-icons tarjeta-precio'}).append(
                        $('<p/>', {'class':'tarjeta-precio'})
                        .text('$'+libro.precio)						
                    ),
					$('<div/>', {'class':'libro-icons tarjeta-detalles'}).append(
						$('<p/>').append(
							$('<a/>').attr({href:'#'+libro.isbn,'data-toggle':'modal','data-target':'#'+libro.isbn}).append(
                        	$('<i/>', {'class':'fas fa-libro-open'})
                    	).text('Ver Detalle'))
					)
                ).appendTo(".mostrar-libros-"+categoria); // .products instead of #products cause you're using a class
            }
        };
    }
    $('.obtenerLibrosPorCategoria').click(function(data) {
        var categoria = $(this).attr('value').toLowerCase() ;
        console.log(categoria);
        MostrarPorCategoria(categoria);
    });  	
	var $misCollapse = $('#misCollapse');
	$misCollapse.on('show.bs.collapse','.collapse', function() {
    $misCollapse.find('.collapse.in').collapse('hide');
});	
});