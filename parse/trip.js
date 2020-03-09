'use strict'

const minBy = require('lodash/minBy')
const maxBy = require('lodash/maxBy')

const parseTrip = (ctx, t) => { // t = raw trip
	const {profile} = ctx

	// pretend the trip is a leg in a journey
	const fakeLeg = {
		type: 'JNY',
		dep: minBy(t.stopL, 'idx'),
		arr: maxBy(t.stopL, 'idx'),
		jny: t,
	}

	// todo: this breaks if the trip starts on a different day
	// how does HAFAS do this?
	const today = () => profile.formatDate(profile, Date.now())
	const date = t.date || today()

	const trip = profile.parseJourneyLeg(ctx, fakeLeg, date)
	trip.id = trip.tripId
	delete trip.tripId

	return trip
}

module.exports = parseTrip
