
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

	let productoBase = $(".plantilla .producto");
    let libros;

    function buscar_productos() {
        console.log("BUSCANDO PRODUCTOS");

        $.ajax({
            //url: 'http://localhost:3000/users',
            url: 'https://my-json-server.typicode.com/ivanperazzo/glei-api-server/libros',
            type: 'GET',
            dataType: 'json',

            success: function(data){ // Funcion de callback
                console.log("RESPUESTA OK");
                console.log(data);
                libros = data;
                console.log(libros);
                for (producto of data) {
                    let nuevoProducto = productoBase.clone();

                    nuevoProducto.find(".nombre").text(producto.title);
                    nuevoProducto.find(".edad").text(producto.subtitle);
                    nuevoProducto.find(".id").text(producto.publisher);

                    $("#ProductosContenedor").append(nuevoProducto);
                }
            },

            error: function(request, error) {
                console.log("Ocurrio un error: " + error);
            }
        });
    }

    buscar_productos();

    function MostrarPorCategoria(categoria){
        $("#div-libros").empty();
        // Loop on JSON.Products
        for (item of libros) {
            // Compare to item instead of this
            if(categoria == item.categoria) {
                console.log(item)
                $('<div/>', {'class':'libro-tarjeta-2'}).append(
                    $('<img>').attr({src:'assets/img/Libros/'+item.portada,title:item.titulo,alt:item.titulo,class:'img img-responsive'}),
                    $('<div/>', {'class':'libro-icons tarjeta-precio'}).append(
                        $('<p/>', {'class':'tarjeta-precio'})
                        .text('$'+item.precio)						
                    ),
					$('<div/>', {'class':'libro-icons tarjeta-detalles'}).append(
						$('<p/>').append(
                        	$('<i/>', {'class':'fas fa-libro-open'})
                    	).text('Ver Detalle')
					)
                ).appendTo("#div-libros"); // .products instead of #products cause you're using a class
            }
        };
    }
    $('.getProductsByCat').click(function(data) {
        var categoria = $(this).attr('value');
        console.log(categoria);
        MostrarPorCategoria(categoria);
    });  
		
});


$('#myModal').on('shown.bs.modal', function () {
	$('#myInput').trigger('focus')
  })
