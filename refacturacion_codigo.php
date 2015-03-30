<?php

	/**
	* Refacturacion del Codigo
	*
	*
	* @author Ing. Jonathan Olier
	*/

	public function post_confim(){
		$id 		= Input::get('service_id');
		$servicio 	= Service::find($id);

		if($servicio != NULL){
			if($servicio->status_id == '6'){
				return Response::json(array('error' => '2'));
			}

			if($servicio->driver_id == NULL && $servicio->status_id == '1'){
				$servicio = Services::update($id, array(
					'driver_id' => Input::get('driver_id'),
					'status' 	=> '2'
				));

				Driver::update(Input::get('driver_id'), array(
					'available' => 0
				));

				$driverTmp = Driver::find(Input::get('driver_id'));
				Service::update($id, array(
					'car_id'=>$driverTmp->car_id
				));

				$pushMessage 	= 'Tu servicio ha sido comfirmado!';
				$servicio 		= Services::find($id);
				$push 			= Push::make();

				if($servicio->user->uuid == ''){
					return Response::json(array('error' => '0'));
				}

				if($servicio->uer->type == '1'){
					$result = $push->ios($servicio->user->uuid, $pushMessage, 1, 'honk.wav', 'Open', array('serviceId' => $servicio->id));
				} else {
					$result = $push->android2($servicio->user->uuid, $pushMessage, 1, 'default', 'Open', array('serviceId' => $servicio->id));
				}

				return Response::json(array('error' => '0'));
			} else {
				return Response::json(array('error' => '1'));
			}
		} else {
			return Response::json(array('error' => '3'));
		}
	}