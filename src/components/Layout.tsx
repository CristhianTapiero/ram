// components/Layout.tsx
interface LayoutProps {
    children: React.ReactNode;
    particiones: number[];
    asignaciones: { [key: number]: number };
  }
  
  const Layout: React.FC<LayoutProps> = ({ children, particiones, asignaciones }) => {
    return (
      <div className="container mx-auto p-4">
        <div className="flex space-x-4 mb-4">
          {particiones.map((tamanio, index) => (
            <div key={index} className="flex-shrink-0 w-1/5 bg-gray-200 p-2 text-center">
              {`Partición ${index + 1} (${tamanio})`}
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mb-4">
          {Object.entries(asignaciones).map(([index, particion]) => (
            <div key={index} className="flex-shrink-0 w-1/5 p-2 text-center">
              {`Tarea ${parseInt(index) + 1} en Partición ${particion + 1}`}
            </div>
          ))}
        </div>
        {children}
      </div>
    );
  };
  
  export default Layout;
  