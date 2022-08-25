import { useEffect, useRef, useState, useReducer } from "react"
import bin from "../../images/bin.svg"
import g1 from "../../images/1.png"
import g2 from "../../images/2.png"
import g3 from "../../images/3.png"
import g4 from "../../images/4.png"
import Garbage from "./garbage"
import "./Main.css"

function Main() {
	const [selectedImage, setSelectedImage] = useState([]);
	const [counter, setCounter] = useState(60);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false)
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
	const [garbageFull, setGarbageFull] = useState(false)



	const image_array = [g1, g2, g3, g4]
	const ref = useRef(null);
	const ref1 = useRef(null);
	var timer;

	const get_random_image = () => {
		const random_index = Math.floor(Math.random() * image_array.length);

		setSelectedImage(image_array[random_index])
		console.log("random img", selectedImage)
		console.log("image_array", image_array)

	}

	useEffect(() => {
		get_random_image()

	}, [ref, ref1, garbageFull])

	useEffect(() => {
		if (counter > 0) {
			timer = setInterval(() => setCounter(counter - 1), 1000)
		}
		else if (counter === 0) {
			setGameOver(true)
		}
	}, [counter])

	useEffect(() => {
		const element = ref.current;

		element.addEventListener('dragstart', (e) => {
			console.log("dragStart has triggred")
			setTimeout(() => {

				e.target.className += " hidden"
			}, 0)
		});

		element.addEventListener('dragend', () => {
			console.log("dragEnd has triggered")
		});
	}, [])

	useEffect(() => {
		const element = ref1.current;

		element.addEventListener("dragover", (e) => {
			e.preventDefault();
			console.log("DragOver triggred")
		})

		element.addEventListener("dragenter", () => {
			console.log("DragEnter triggred")
		})
		element.addEventListener("dragleave", () => {
			console.log("DragLeave triggred")
		})
		element.addEventListener("drop", (e) => {
			// e.target.className += " hidden"
			if (!garbageFull) {

				clearInterval(timer);
				setCounter(60)
				setScore(score + 1)
				// forceUpdate()
				console.log("Drop triggred")
				setGarbageFull(true)
				console.log("garbage full")
			}
		}, [garbageFull])


	}, [])

	useEffect(() => {
		if (garbageFull) {
			setInterval(() => setGarbageFull(false), 100)

			setInterval(() => console.log("garbage empty"), 100)
		}
	})

	return (
		<div className="h-screen flex flex-col bg-green-300">
			{gameOver ? <div>
				<h1 className="text-center font-bold text-8xl top-10">Game Over</h1>
				<span className="flex justify-center top-50 text-3xl">Score : {score}</span>
			</div> :
				<>

					<h1 className="text-center font-bold text-4xl">Garbage DnD</h1>
					<div>
						<span className=" absolute top-20 left-24 text-3xl">Time Left : {counter}</span>
						<span className=" absolute top-20 right-48 text-3xl">Score : {score}</span>
					</div>
					{!garbageFull ?

						<div ref={ref}>
							<Garbage Score={score} SelectedImage={selectedImage} />
						</div> : <></>
					}
					<div className="bin" ref={ref1}>
						<img className="h-40 absolute bottom-0 left-3 animate-bounce" src={bin} />
					</div>
				</>
			}

		</div>
	);
}

export default Main;
