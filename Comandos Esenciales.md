Clonar
    
    git clone (link del repositorio)

Seleccionar Branch
    
    git checkout (nombre de la rama)

*No olvidar trabajar desde la carpeta del proyecto*

    cd (nombre de la carpeta por abrir)

Una vez modificado los archivos debemos subir los cambios.

    git add .

Verificamos que nuestra subida sea el o los archivo(s) que hemos modificado
  
    git status

Debemos mencionar obligatoriamente los cambios que hemos realizado
  
    git commit -m "Aquí comentamos"

Ahora subimos nuestros cambios a nuestra Branch
 
    git push origin "Nombre de nuestra Branch"
    (En este punto, si no hemos iniciado sesión en GitHub, se nos redireccionará para iniciar sesión)

Una vez actualizada nuestra rama, realizamos el cambio a la rama Main
  
    git checkout main

Ahora unimos nuestros cambios con la rama Principal
  
    git merge "El nombre de nuestra rama"

Finalmente Solicitamos la Revisión y Aprobación de los cambios realizados al Jefe de Proyecto
 
    git push origin main
