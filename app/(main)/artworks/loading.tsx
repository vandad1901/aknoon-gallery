export default function LoadingScreen() {
    return (
        <div className="mt-20 flex flex-col items-center">
            <h1 className="mb-4 text-xl font-bold">در حال جستجو...</h1>
            <g className="h-20 w-20">
                <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                    <defs></defs>
                    <ellipse
                        cx="150"
                        cy="150"
                        rx="125"
                        ry="125"
                        stroke="rgb(220,220,220)"
                        stroke-width="25"
                        fill="none"></ellipse>
                    <path
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M130  35 Q140 50  150 55  Q160 50  170 35"></path>
                    <path
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M35  130 Q50  140 55  150 Q50  160 35  170"></path>
                    <path
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M265 130 Q250 140 245 150 Q250 160 265 170"></path>
                    <path
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M130 265 Q140 250 150 245 Q160 250 170 265"></path>
                    <path
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M120 150 Q130 130 150 120 Q170 130 180 150 Q170 170 150 180 Q130 170 120 150"></path>
                    <path
                        className="origin-center animate-spin"
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M144 130 L144 80  L150 73 156 80 156 130"></path>
                    <path
                        className="duration-900 origin-center animate-spin"
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M170 148 L246 148 L250 150 L246 152 L170 152"></path>
                    <path
                        className="origin-center animate-spin duration-700"
                        fill="rgb(220, 220, 220)"
                        stroke="none"
                        d="M135 165 l-1 -1 l-67 67 l0 2 l 2 0 l 67 -67"></path>
                </svg>
            </g>
            {/* <ArrowPathIcon className="h-10 w-10 animate-spin" /> */}
        </div>
    );
}
