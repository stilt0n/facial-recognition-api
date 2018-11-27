const Clarifai = require('clarifai');

const FACE_MODEL = "a403429f2ddf4b49b307e318f00e528b";
//the face model id for Clarifai
const clApp = new Clarifai.App({
  apiKey: '01caa341e4814061a6e7183be682c4cd'
});

const handleApiCall = (req, res) => {
//predict takes a model and an image url as inputs
	clApp.models
		.predict(FACE_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("api call didn't work"));
}

const imageHandler = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("that didn't work"));
};

module.exports = {
	imageHandler,
	handleApiCall
};