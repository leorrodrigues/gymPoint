import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentsNew from '~/pages/Students/New';
import StudentsEdit from '~/pages/Students/Edit';

import Plans from '~/pages/Plans';
import PlansNew from '~/pages/Plans/New';
import PlansEdit from '~/pages/Plans/Edit';

import Enrollments from '~/pages/Enrollments';
import EnrollmentsNew from '~/pages/Enrollments/New';
import EnrollmentsEdit from '~/pages/Enrollments/Edit';

import HelpOrders from '~/pages/HelpOrders';
import HelpOrdersNew from '~/pages/HelpOrders/New';
import HelpOrdersEdit from '~/pages/HelpOrders/Edit';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />
			<Route
				path="/students"
				component={Students}
				isPrivate
				navItem="STUDENTS"
				exact
			/>
			<Route
				path="/students/new"
				component={StudentsNew}
				isPrivate
				navItem="STUDENTS"
			/>
			<Route
				path="/students/:id/edit"
				component={StudentsEdit}
				isPrivate
				navItem="STUDENTS"
			/>
			<Route
				path="/plans"
				component={Plans}
				isPrivate
				navItem="PLANS"
				exact
			/>
			<Route
				path="/plans/new"
				component={PlansNew}
				isPrivate
				navItem="PLANS"
			/>
			<Route
				path="/plans/:id/edit"
				component={PlansEdit}
				isPrivate
				navItem="PLANS"
			/>

			<Route
				path="/enrollments"
				component={Enrollments}
				isPrivate
				navItem="ENROLLMENTS"
				exact
			/>
			<Route
				path="/enrollments/new"
				component={EnrollmentsNew}
				isPrivate
				navItem="ENROLLMENTS"
				exact
			/>
			<Route
				path="/enrollments/:student_id/:plan_id/edit"
				component={EnrollmentsEdit}
				isPrivate
				navItem="ENROLLMENTS"
				exact
			/>

			<Route
				path="/help-orders"
				component={HelpOrders}
				isPrivate
				navItem="ASSISTANCE REQUESTS"
				exact
			/>
			<Route
				path="/help-orders/new"
				component={HelpOrdersNew}
				isPrivate
				navItem="ASSISTANCE REQUESTS"
				exact
			/>
			<Route
				path="/help-orders/:id/edit"
				component={HelpOrdersEdit}
				isPrivate
				navItem="ASSISTANCE REQUESTS"
				exact
			/>
		</Switch>
	);
}
