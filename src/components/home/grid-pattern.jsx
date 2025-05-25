const GridPattern = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]"
                style={{
                    backgroundImage: `
            radial-gradient(circle at center, rgba(51, 51, 51, 0.3) 0.5px, transparent 0.5px),
            radial-gradient(circle at center, rgba(51, 51, 51, 0.3) 0.5px, transparent 0.5px)
          `,
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 30px 30px',
                    mask: 'radial-gradient(circle at center, black, transparent 70%)'
                }}
            />
        </div>
    )
}

export default GridPattern
