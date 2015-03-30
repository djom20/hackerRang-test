<?php

	/**
	* Re-facturación del Codigo
	*
	* @author Ing. Jonathan Olier (djom20)
	*
	*/

	public function post_confim(){
		$id 		= Input::get('service_id');
		$servicio 	= Service::find($id);
		$pushTmp	= array();
		$error		= '0';

		if($servicio != NULL){
			if($servicio->status_id != '6'){
				if($servicio->driver_id == NULL && $servicio->status_id == '1'){
					Driver::update(Input::get('driver_id'), array(
						'available' => 0
					));

					$driverTmp = Driver::find(Input::get('driver_id'));

					$servicio = Service::update($id, array(
						'driver_id' => Input::get('driver_id'),
						'car_id' 	=> $driverTmp->car_id,
						'status' 	=> '2'
					));

					$pushTmp = Push::make();

					if($servicio->user->uuid != ''){
						if($servicio->uer->type == '1'){
							$pushTmp = array('func' => 'ios', 'sound' => 'honk.wav');
						} else {
							$pushTmp = array('func' => 'android2', 'sound' => 'default');
						}

						$result = $push->$pushTmp['func']($servicio->user->uuid, 'Tu servicio ha sido comfirmado!', 1, $pushTmp['sound'], 'Open', array('serviceId' => $servicio->id));
					}
				} else { $error = '1'; }
			} else { $error = '2'; }
		} else { $error = '3'; }

		return Response::json(array('error' => $error));
	}