'use client'
// pages/index.tsx
import { useState } from 'react';
import Layout from '../components/Layout';

const IndexPage: React.FC = () => {
  const particiones = [25, 20, 15, 30, 35];
  const [tamaniosTareas, setTamaniosTareas] = useState<number[]>([0, 0, 0, 0, 0]);
  const [estrategia, setEstrategia] = useState<string>('');
  const [asignaciones, setAsignaciones] = useState<number[]>([]);

  const handleTamanioTareaChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevosTamanios = [...tamaniosTareas];
    nuevosTamanios[index] = parseInt(e.target.value, 10);
    setTamaniosTareas(nuevosTamanios);
  };

  const handleEstrategiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstrategia(e.target.value);
  };

  const handleAsignarTareas = () => {
    const nuevasAsignaciones: number[] = [];
    tamaniosTareas.forEach((tamanio, index) => {
      const particion = estrategia === 'mejor_ajuste'
        ? asignarMejorAjuste(tamanio, nuevasAsignaciones)
        : asignarEnOrden(tamanio, nuevasAsignaciones);
      nuevasAsignaciones[index] = particion;
    });
    setAsignaciones(nuevasAsignaciones);
  };

  const asignarMejorAjuste = (tamanio: number, asignacionesAnteriores: number[]): number => {
    // Lógica de asignación de tarea según Mejor Ajuste aquí
    let mejorParticion = -1;
    let mejorAjuste = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < particiones.length; i++) {
      if (!asignacionesAnteriores.includes(i)) {
        if (particiones[i] === tamanio) {
          return i;
        }

        const ajuste = particiones[i] - tamanio;
        if (ajuste >= 0 && ajuste < mejorAjuste) {
          mejorAjuste = ajuste;
          mejorParticion = i;
        }
      }
    }

    return mejorParticion;
  };

  const asignarEnOrden = (tamanio: number, asignacionesAnteriores: number[]): number => {
    // Lógica de asignación de tarea según En Orden aquí
    for (let i = 0; i < particiones.length; i++) {
      if (!asignacionesAnteriores.includes(i) && particiones[i] >= tamanio) {
        return i;
      }
    }

    return -1; // No hay particiones disponibles
  };

  return (
    <Layout particiones={particiones} asignaciones={asignaciones}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Simulador de Memoria</h1>
        <form className="flex flex-col items-center" onSubmit={(e) => { e.preventDefault(); handleAsignarTareas(); }}>
          {tamaniosTareas.map((tamanio, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-semibold mb-2">{`Tamaño de Tarea ${index + 1}:`}</label>
              <input
                type="number"
                value={tamanio}
                onChange={(e) => handleTamanioTareaChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Estrategia de Asignación:</label>
            <select
              value={estrategia}
              onChange={handleEstrategiaChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccione una estrategia</option>
              <option value="mejor_ajuste">Mejor Ajuste</option>
              <option value="en_orden">En Orden</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={tamaniosTareas.some((tamanio) => tamanio === 0) || !estrategia}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Asignar Tareas
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default IndexPage;
