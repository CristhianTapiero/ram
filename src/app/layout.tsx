import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <title>Uso de Memoria</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
