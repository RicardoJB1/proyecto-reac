import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../App.css';

const ListaDocentes = () => {
    const [docentesMasculinos, setDocentesMasculinos] = useState([]);
    const [docentesFemeninos, setDocentesFemeninos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();

                // Filtrar docentes por sexo
                const masculinos = data.filter(docente => docente.sexo === 'M');
                const femeninos = data.filter(docente => docente.sexo === 'F');

                setDocentesMasculinos(masculinos);
                setDocentesFemeninos(femeninos);
            } catch (error) {
                console.error("Fetch error:", error.message);
            }
        };

        // Llamada inicial
        fetchData();

        // Configura una actualización automática cada 5 segundos (5000 ms)
        const intervalId = setInterval(fetchData, 5000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []);

    // Datos para el gráfico de barras y pastel
    const barData = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                label: 'Cantidad de Docentes',
                data: [docentesMasculinos.length, docentesFemeninos.length],
                backgroundColor: ['#4a90e2', '#f55a5a'],
            },
        ],
    };

    const pieData = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                label: 'Cantidad de Docentes',
                data: [docentesMasculinos.length, docentesFemeninos.length],
                backgroundColor: ['#4a90e2', '#f55a5a'],
            },
        ],
    };

    return (
        <div>
            <h1 className="App App-link">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>
            
            {/* Tabla de Docentes Masculinos */}
            <h2>Docentes Masculinos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {docentesMasculinos.map((docente) => (
                        <tr key={docente.id}>
                            <td>{docente.id}</td>
                            <td>{docente.nombre}</td>
                            <td>{docente.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Tabla de Docentes Femeninos */}
            <h2>Docentes Femeninos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {docentesFemeninos.map((docente) => (
                        <tr key={docente.id}>
                            <td>{docente.id}</td>
                            <td>{docente.nombre}</td>
                            <td>{docente.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Gráfico de Barras y Gráfico de Pastel */}
            <div className="chart-container">
                <h2>Gráfico de Barras - Distribución por Sexo</h2>
                <Bar data={barData} />

                <h2>Gráfico de Pastel - Distribución por Sexo</h2>
                <Pie data={pieData} />
            </div>
        </div>
    );
};

export default ListaDocentes;
