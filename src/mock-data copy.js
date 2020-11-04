let profiles = [
	{
		username: 'jhaezhyr',
		password: '12345',
		inbox: [{
			sender: 'apple'
		}],
		persons: [{
			name: 'Braeden Hintze',
			gender: 'male',
			description: "I'm a singing programmer!",
		}],
		priorities: {
			dealbreakers: [
				'romance',
				'substances',
			],
			preferred: [
				'partying',
				'friendliness',
				'pets',
				'food',
			],
			unimportant: [
				'tidiness',
			],
		},
		preferences: {
			romance: 0,
			substances: 0,
			partying: 1,
			friendliness: 2,
			pets: 0,
			food: 2,
			tidiness: 0,
		},
		search: {
			type: 'find', // Options are 'post' and 'find'
			room: 'shared', // Options are 'shared' and 'private'
			zone: { zipCode: '84604' },
			moveInDate: '2021-01-01',
			moveOutDate: '2021-05-01',
			paymentMin: 300, // Dollars per month
			paymentMax: 400, // Dollars per month
		},
		profilesRejected: [],
	},
	{
		username: 'apple',
		password: '54321',
		inbox: [],
		persons: [{
			name: 'John Doe',
			gender: 'male',
			description: "I love skiing, hiking, and reading books.",
		}],
		priorities: {
			dealbreakers: [
				'partying',
			],
			preferred: [
				'food',
				'pets',
				'friendliness',
				'tidiness',
			],
			unimportant: [
				'romance',
				'substances',
			],
		},
		preferences: {
			partying: 2,
			food: 1,
			pets: 2,
			friendliness: 2,
			tidiness: 1,
			substances: 2,
			romance: 2,
		},
		search: {
			type: 'post', // Options are 'post' and 'find'
			room: 'shared', // Options are 'shared' and 'private'
			location: { address: "7 Heritage Halls #3111", city: 'Provo', state: 'UT', zipCode: '84604' },
			moveInDate: '2021-01-01',
			moveOutDate: '2021-05-01',
			payment: 350, // Dollars per month
			googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.690905236444!2d-111.6467689747332!3d40.25204569930119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d97c56e9cda59%3A0xa35c85d38ee968d5!2sHeritage%20Halls%20Building%207!5e0!3m2!1sen!2sus!4v1601103263021!5m2!1sen!2sus",
			details: {
				laundry: "Paid laundry facilities.",
				parking: "Low parking."
			}
		},
		profilesRejected: [],
	},
	{
		username: 'sherlyThe_1',
		password: '0101010101',
		inbox: [{ sender: 'jhaezhyr' }],
		persons: [{
			name: 'Sherman Swampy',
			gender: 'male',
			description: "I ain't got rhythm, but I belong to a good rock band.",
		}],
		priorities: {
			dealbreakers: [
				'tidiness',
				'pets',
			],
			preferred: [
				'substances',
				'partying',
				'romance',
			],
			unimportant: [
				'friendliness',
				'food',
			],
		},
		preferences: {
			partying: 0,
			food: 0,
			pets: 0,
			friendliness: 0,
			tidiness: 2,
			substances: 0,
			romance: 1,
		},
		search: {
			type: 'post', // Options are 'post' and 'find'
			room: 'shared', // Options are 'shared' and 'private'
			location: { address: "1243 N 300 E", city: 'Danville', state: 'UT', zipCode: '84604' },
			moveInDate: '2021-01-01',
			moveOutDate: '2021-07-01',
			payment: 50, // Dollars per month
			googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.690905236444!2d-111.6467689747332!3d40.25204569930119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d97c56e9cda59%3A0xa35c85d38ee968d5!2sHeritage%20Halls%20Building%207!5e0!3m2!1sen!2sus!4v1601103263021!5m2!1sen!2sus",
			details: {
				security: "No extraterrestrials.",
				parking: "Two car garage to share among the five."
			}
		},
		profilesRejected: [],
	}
];
let preferenceStrings = {
	tidiness: [
		"My space is an H-bomb testing zone.",
		"If it ain't dirty, don't clean it.",
		"I always clean up.",
	],
	pets: [
		"I won't bring a pet.",
		"I would rather bring my pet.",
		"I need my pet.",
	],
	partying: [
		"My house is my sanctuary.",
		"Home is where the friends are.",
		"The more, the merrier!",
	],
	friendliness: [
		"My headphones and I are a very exclusive gang.",
		"I'd be happy to get to know you.",
		"I'm looking for a new BFF!",
	],
	substances: [
		"I'm stone cold sober.",
		"The occasional drink doesn't hurt.",
		"The freezer is made for beer.",
	],
	romance: [
		"My bed is mine alone.",
		"I like a few hot nights.",
		"I enjoy a lot of hot nights.",
	],
	food: [
		"I don't share my food.",
		"Eggs and milk are fair game for everyone.",
		"How often can we do potluck?",
	],
};
let genderStrings = {
	male: "Male",
	female: "Female",
};
let roomSearchStrings = {
	shared: "Shared",
	private: "Private",
};
let priorityStrings = {
	tidiness: "Tidiness",
	pets: "Pets",
	partying: "Partying",
	friendliness: "Friendliness",
	substances: "Drugs/Alcohol",
	romance: "Romance",
	food: "Food",
};
let categoryStrings = {
	dealbreakers: "Dealbreakers",
	preferred: "Preferred",
	unimportant: "Unimportant",
};

let strings = {
	preferences: preferenceStrings,
	priorities: priorityStrings,
	roomSearch: roomSearchStrings,
	genders: genderStrings,
	categories: categoryStrings,
}

let mock = {
	profiles,
	strings
}


export default mock;