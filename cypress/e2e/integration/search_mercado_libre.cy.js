describe("Search Playstation 5", () => {

    // Caso de prueba de busqueda
    it("Caso buscar playstation 5", () => {
      cy.visit("https://www.mercadolibre.com");
      
      // obtener el elemento de mexico
      cy.get('#MX')
       .should('have.attr', 'href') // .and('include', 'contact')
       .then((hrefMX) => {
          cy.log('Mexico ML ' + hrefMX);
          cy.visit(hrefMX);
  
          
          cy.origin(hrefMX, () => {
            // Ingresar texto a buscar
            cy.get('#cb1-edit').type('Playstation 5');
            // hacer click en boton de busqueda
            cy.get('.nav-search-btn').click()
          });
  
          
          cy.origin('https://listado.mercadolibre.com.mx/playstation-5#D[A:playstation%205]', () => {
            cy.wait(6000);
            // buscar el boton de elementos nuevos
            cy.get('section div ul li a[title^="Nuevo,"]')
              .should('have.attr', 'href')
              .then(hrefNuevo => {
                cy.log('NUEVO ' + hrefNuevo);
                // redireccionar a busqueda solo con elementos nuevos
                cy.visit(hrefNuevo);
              })
              .then(() => {
                  // buscar boton para filtrar por Distrito federal
                  cy.get('section div ul li a[title^="Distrito"]')
                    .should('have.attr', 'href')
                    .then(hrefDistrito => {
                      cy.log('DISTRITO ' + hrefDistrito);
                      // redireccionar a busqueda agregando filtro de distrito
                      cy.visit(hrefDistrito);
                    })
                    .then(() => {
                        // espera para que se pinte el boton de filtro compltamente
                        cy.wait(3000);
                        // buscar boton de ordenamiento para mostrar opciones
                        cy.get('.ui-search-sort-filter').click();
                        cy.wait(1000);
                        // buscar boton para ordenar por mayor a menor precio
                        cy.contains('Mayor precio').click();
  
                        cy.wait(3000)
  
                        let count = 0;
                        let max = 5; // maximo elementos a imprimir
                        // iterar elementos encontrados para imprimir
                        cy.get('section ol li')
                          .each(($el, index) => {
  
                            if (count == max) { // imprimir los primeros 5 productos
                              return false; // salir de la iteracion cuando llegue a 5
                            }
  
                            let name;
                            let price;
                            // tomar el elemento iterado y buscar el tag "a" que contiene la descripcion
                            cy.wrap($el)
                              .find('a')
                              .then(a => {
                                name = a.text();
                                // imprimir nombre del producto
                                cy.log('Prudcto numero ' + (index+1) + ', nombre: ' + name);
                              });
                              // tomar el elemento iterado y buscar el tag "a" que contiene el precio
                            cy.wrap($el)
                              .find('div.poly-price__current')
                              .then(a => {
                                price = a.text()
                                // imprimir precio del producto
                                cy.log('Pruducto numero ' + (index+1) + ', precio: ' + price)
                              });
  
                              // actualizar onctador
                            count++
                            
                          })
                    })
                })
          })
  
  
       })
    })
  
  })







        
