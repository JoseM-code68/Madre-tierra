"""
Script para descargar avatares reales de personas para los testimoniales
Usa la API de randomuser.me para obtener fotos profesionales
"""
import requests
import os

# Crear directorio para avatares si no existe
avatars_dir = "images/avatars"
os.makedirs(avatars_dir, exist_ok=True)

# Definir los testimoniales con género
testimonials = [
    {"name": "ana-martinez", "gender": "female"},
    {"name": "carlos-rodriguez", "gender": "male"},
    {"name": "maria-gonzalez", "gender": "female"}
]

print("Descargando avatares de personas reales...")

for person in testimonials:
    try:
        # Llamar a la API de randomuser.me con el género apropiado
        response = requests.get(
            f"https://randomuser.me/api/?gender={person['gender']}&nat=es&inc=picture"
        )
        
        if response.status_code == 200:
            data = response.json()
            # Obtener la URL de la imagen grande
            avatar_url = data['results'][0]['picture']['large']
            
            # Descargar la imagen
            img_response = requests.get(avatar_url)
            
            if img_response.status_code == 200:
                # Guardar la imagen
                filename = f"{avatars_dir}/{person['name']}.jpg"
                with open(filename, 'wb') as f:
                    f.write(img_response.content)
                print(f"OK - Descargado: {filename}")
            else:
                print(f"ERROR - descargando imagen para {person['name']}")
        else:
            print(f"ERROR - en API para {person['name']}")
            
    except Exception as e:
        print(f"ERROR - procesando {person['name']}: {e}")

print("\nAvatares descargados exitosamente!")
print(f"Ubicacion: {os.path.abspath(avatars_dir)}")
