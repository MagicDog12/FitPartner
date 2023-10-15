
export const Loading = () => {

    return (
        <>
            <div className="flex w-full h-full items-center justify-center backdrop-blur-lg">
                <h2 className="absolute top-1/4 text-2xl font-semibold text-center">Cargando</h2>
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>
        </>
    )
};