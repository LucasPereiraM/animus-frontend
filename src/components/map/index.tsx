import React, { useEffect, useRef } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  apiKey: string;
}

let isLoadingScript = false;
let scriptLoaded = false;

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    if (isLoadingScript) {
      const checkIfLoaded = () => {
        if (scriptLoaded) {
          resolve();
        } else {
          setTimeout(checkIfLoaded, 100);
        }
      };
      checkIfLoaded();
      return;
    }

    isLoadingScript = true;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      scriptLoaded = true;
      isLoadingScript = false;
      resolve();
    };

    script.onerror = () => {
      isLoadingScript = false;
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });
};

const Map: React.FC<MapProps> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const defaultLocation: Location = { lat: -18.7238, lng: -47.5241 };
  const markersRef = useRef<google.maps.Marker[]>([]);

  const handleLocationError = (
    browserHasGeolocation: boolean,
    map: google.maps.Map,
    pos: Location
  ) => {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Erro: O serviço de geolocalização falhou."
        : "Erro: Seu navegador não suporta geolocalização."
    );
    infoWindow.open(map);
  };

  const searchNearbyPlaces = (
    service: google.maps.places.PlacesService,
    location: Location,
    map: google.maps.Map,
    keyword: string
  ): Promise<google.maps.places.PlaceResult[]> => {
    return new Promise((resolve) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 4000,
        type: 'health',
        keyword: keyword
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          resolve([]);
        }
      });
    });
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  const initMap = async (position: GeolocationPosition) => {
    if (!mapRef.current) return;

    const minhaLocalizacao: Location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    const map = new google.maps.Map(mapRef.current, {
      center: minhaLocalizacao,
      zoom: 14,
    });

    const service = new google.maps.places.PlacesService(map);
    
    try {
      clearMarkers();

      const keywords = [
        'psicólogo',
        'psiquiatra',
        'saúde mental',
        'terapia',
        'clínica psicológica'
      ];

      const searchPromises = keywords.map(keyword => 
        searchNearbyPlaces(service, minhaLocalizacao, map, keyword)
      );

      const allResults = await Promise.all(searchPromises);
      const uniquePlaces: Record<string, google.maps.places.PlaceResult> = {};

      allResults.flat().forEach(place => {
        if (place.place_id && !uniquePlaces[place.place_id]) {
          uniquePlaces[place.place_id] = place;
        }
      });

      Object.values(uniquePlaces).forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        });

        markersRef.current.push(marker);

        const infoWindow = new google.maps.InfoWindow();

        marker.addListener("click", () => {
          service.getDetails(
            {
              placeId: place.place_id!,
              fields: ['name', 'formatted_address', 'rating', 'photos', 'formatted_phone_number', 'website', 'opening_hours']
            },
            (placeDetails, detailStatus) => {
              if (detailStatus === google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                let contentString = `
                  <div style="max-width: 300px;">
                    <strong style="font-size: 16px;">${placeDetails.name}</strong><br>
                    <div style="margin: 8px 0;">
                      ${placeDetails.formatted_address || ''}<br>
                      ${placeDetails.formatted_phone_number ? `📞 ${placeDetails.formatted_phone_number}<br>` : ''}
                      ${placeDetails.rating ? `⭐ ${placeDetails.rating} / 5<br>` : 'Sem avaliação<br>'}
                    </div>
                `;

                if (placeDetails.opening_hours?.weekday_text) {
                  contentString += `
                    <div style="margin: 8px 0;">
                      <strong>Horário de Funcionamento:</strong><br>
                      ${placeDetails.opening_hours.weekday_text.join('<br>')}
                    </div>
                  `;
                }

                if (placeDetails.website) {
                  contentString += `
                    <div style="margin: 8px 0;">
                      <a href="${placeDetails.website}" target="_blank" style="color: #2679bd;">Visitar Website</a>
                    </div>
                  `;
                }

                if (placeDetails.photos && placeDetails.photos.length > 0) {
                  contentString += `
                    <div style="margin: 8px 0;">
                      <img src="${placeDetails.photos[0].getUrl({maxWidth: 200, maxHeight: 150})}" 
                           alt="Foto do local" style="width: 100%; max-width: 200px; height: auto;">
                    </div>
                  `;
                }

                contentString += "</div>";
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
              }
            }
          );
        });
      });

    } catch (error) {
      console.error("Erro na pesquisa:", error);
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadGoogleMapsScript(apiKey);
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            initMap,
            () => {
              if (!mapRef.current) return;
              const map = new google.maps.Map(mapRef.current, {
                center: defaultLocation,
                zoom: 14,
              });
              handleLocationError(true, map, defaultLocation);
            }
          );
        } else {
          if (!mapRef.current) return;
          const map = new google.maps.Map(mapRef.current, {
            center: defaultLocation,
            zoom: 14,
          });
          handleLocationError(false, map, defaultLocation);
        }
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initializeMap();

    return () => {
      clearMarkers();
    };
  }, [apiKey]);

  return (
    <div className="h-[700px] mt-20 mb-20 flex flex-col gap-5">
      <h1 className='text-4xl text-gray-600'>Profissionais na sua área</h1>
      <p className='mb-10'>Veja detalhes sobre a localização de profissionais da saúde mental próximos.</p>
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

export default Map;