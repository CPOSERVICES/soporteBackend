module.exports = {
    host: 'smtp.loa.com.ec',
    port: '465',
    user: 'cpomensajes@loa.com.ec',
    pass: 'cpo.2020',
    from: '"CPOSERVICES " <cpomensajes@loa.com.ec>', // sender address
    subject: "CPO SERVICES: Cambio de estado del ticket", // Subject line
    //text: "Su ticket a sido verificado y sol", // plain text body
    html: '<head><title>Cambio de estado del Ticket </title></head>'+
	'<body><h1>Inconveniente Solucionado</h1>'+
	'<h2>Estimado/a: <br> Su ticket a sido verificado y solucionado favor confirmar solución del inconveniente.!</h2>'+
	'<hr>'+
    '<h5>Saludos Cordiales,<br>Cristian Piguave<br><b>CPO SERVICES</b><br>'+
    'Llirañan S37.101 y CondorÑan<br>Fono: 022738798 - 0999213346<br>'+
    'Quito - Ecuador</h5>'+
	'</body>'+
	'</html>'

}