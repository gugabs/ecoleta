import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import api from "../../services/api";

import "./style.css";

import { FiArrowLeft } from "react-icons/fi";

import ecoletaLogo from "../../assets/img/logo.svg";

import Dropzone from "../../components/Dropzone";

import { LeafletMouseEvent } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const CreatePoint = () => {

    const history = useHistory();

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        const {
            name,
            email,
            whatsapp
        } = formData;

        const state = selectedState;
        const city = selectedCity;

        const coordinates = mapPosition;

        const items = selectedItems;

        const data = new FormData();

        data.append("name", name);
        data.append("email", email);
        data.append("whatsapp", whatsapp);
        data.append("state", state);
        data.append("city", city);
        data.append("latitude", String(coordinates?.lat));
        data.append("longitude", String(coordinates?.lng));
        data.append("items", items.join(','));

        if(uploadedImage)
        {
            data.append("image", uploadedImage);
        }

        await api.post("points", data);

        alert("Ponto cadastrado!");

        history.push('/');

    }

    const [uploadedImage, setUploadedImage] = useState<File>();

    const emptyInput = "";

    const [formData, setFormData] = useState({

        name: emptyInput,
        email: emptyInput,
        whatsapp: emptyInput

    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {

        const {
            name,
            value
        } = event.target;

        setFormData({ ...formData, [name]: value });

    }

    interface IBGE_UFs {

        sigla: string;
        nome: string;

    }

    const [states, setStates] = useState<IBGE_UFs[]>([]);

    useEffect(() => {
        axios.get<IBGE_UFs[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados/").then(response => {

            const states: IBGE_UFs[] = response.data.map(uf => {

                return {

                    sigla: uf.sigla,
                    nome: uf.nome

                };

            });

            setStates(states);

        });
    }, []);

    const [selectedState, setSelectedState] = useState('0');

    function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {

        setSelectedState(event.target.value);

    }

    interface IBGE_Cities {

        nome: string;

    }

    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {

        if(selectedState === '0')
            return;

        axios.get<IBGE_Cities[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + selectedState + "/municipios").then(response => {

            const cities = response.data.map(city => city.nome);

            setCities(cities);

        });

    }, [selectedState]);

    const [selectedCity, setSelectedCities] = useState('0');

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {

        setSelectedCities(event.target.value);

    }

    const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(centerPosition => {

            const {
                latitude,
                longitude
            } = centerPosition.coords;

            setMapCenter([latitude, longitude]);

        });

    }, []);

    function Map() {

        return (

            <MapContainer center={ mapCenter } zoom={ 12 } >
                <TileLayer 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerLocation />
            </MapContainer>

        );

    }

    interface MarkerPosition {

        lat: number;
        lng: number;

    }

    const [mapPosition, setMapPosition] = useState<MarkerPosition | null>(null);

    function MarkerLocation() {

        useMapEvents({

            click(event: LeafletMouseEvent) {

                const position = {

                    lat: event.latlng.lat,
                    lng: event.latlng.lng

                }

                setMapPosition(position);

            }

        });

        return mapPosition === null ? null : (

            <Marker position={mapPosition} />

        );

    }

    interface Item {

        id: number;
        title: string;
        image_url: string;

    }

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {

        api.get("items").then(response => {

            setItems(response.data);

        });

    }, []);

    const [selectedItems, setSelectedItemms] = useState<number[]>([]);

    function handleSelectItem(id: number) {

        const alreadySelected = selectedItems.includes(id);

        if(alreadySelected)
        {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItemms(filteredItems);
        }
        else
        {
            setSelectedItemms([...selectedItems, id]);
        }

    }

    return (
        
        <div id="page-create-point">
            <header>
                <img src={ ecoletaLogo } alt="Logotipo Ecoleta"/>

                <Link to='/'>
                    <FiArrowLeft />
                    Voltar
                </Link>
            </header>

            <form onSubmit={ handleSubmit }>
                <h1>Cadastrar ponto de coleta</h1>

                <Dropzone onImageUpload={ setUploadedImage }/>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={ handleInputChange }
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Após preencher os campos, selecione o local da entidade no mapa.</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf" value={ selectedState } onChange={ handleSelectState }>
                                <option value='0'>Selecione uma UF</option>
                                {
                                    states.map(state => {

                                        return (

                                            <option key={ state.sigla } value={ state.sigla }>{ state.nome + " - " + state.sigla }</option>

                                        );

                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={ selectedCity } onChange={handleSelectCity}>
                                <option value='0'>Selecione uma cidade</option>
                                {
                                    cities.map(city => {

                                        return (

                                            <option key={ city } value={ city }>{ city }</option>

                                        );

                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mapContainer">
                        <Map />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo.</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            items.map(item => {

                                return (

                                        <li 
                                            key={ item.id } 
                                            onClick={ () => handleSelectItem(item.id) }
                                            className={ selectedItems.includes(item.id) ? "selected" : "" }
                                        >
                                        <img
                                            src={ item.image_url }
                                            alt={ item.title }
                                        />
                                        <span>{ item.title }</span>
                                    </li>

                                );

                            })
                        }
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>

    );

}

export default CreatePoint;
