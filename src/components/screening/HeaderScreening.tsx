export const HeaderScreening = ()=>{
    return (
      <>
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Sistema de Reserva de Asientos
        </h1>

        {/* Pantalla */}
        <div className="text-center mb-12">
          <div className="text-white text-2xl font-bold mb-6">SCREEN</div>
          <div className="relative mx-auto w-96 h-8 mb-8">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-600 rounded-t-full transform perspective-1000 rotateX-12 shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-700 rounded-t-full transform translate-y-1 shadow-inner"></div>
          </div>
        </div>
      </>
    );
}