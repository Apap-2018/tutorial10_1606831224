import React from 'react';
import { Loading } from '../components/Loading';
import { FormTambahLabResult } from '../containers/FormTambahLabResult';
import { Appointment } from '../utils/Appointment';

export class TambahLab extends React.Component {
	/** 
	 * TODO: Akses method getDetailPasien(idPasien) pada Appointment dan lakukan update state. 
	 * TODO: Lakukan pemanggilan pada constructor() atau pada lifecycle componentDidMount()
	 */

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			pasien: {
                id : this.props.match.params.id
            },
            lab : {}
		}
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.setState({
			loading : true
		})

		const data = new FormData(e.target)
		const dataJson = {}

		data.forEach((val, key) => {
			if (val !== ""){
				let name = key.split('.');
				if (name.length > 1) {
					let last = name.pop()
					name.reduce((prev,next) => {
						return prev[next] = prev[next] || {};
					}, dataJson)[last] = val
				} else {
					dataJson[key] = val
				}
			}
		})

		Appointment.addLabResult(dataJson).then(response => {
			if (response.status === 200) {
				this.setState({
					loading : false,
					lab : response.result
				})
				alert(`Sukses tambah Hasil Lab dengan id ${this.state.lab.id}`)
			} else {
				this.setState({
					loading : false
				})
				alert(`Gagal tambah hasil lab`)
			}
		})

	}

	render() {
		if (this.state.loading) {
			return (
				<Loading msg="Fetching Data..." />
			)
		} else {
			return (
				<FormTambahLabResult pasien={this.state.pasien} onSubmit={this.handleFormSubmit} />
			)
		}
	}
}