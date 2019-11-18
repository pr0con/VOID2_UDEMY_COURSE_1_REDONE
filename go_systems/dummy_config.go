//MOVE THIS TO YOUR src/procon_config and set correct passwords
package procon_config

import (
	"fmt"
	"crypto/rsa"
	
	jwtgo "github.com/dgrijalva/jwt-go"
	
	"procon_fs"
)

var (
	PubKeyFile	*rsa.PublicKey
	PrivKeyFile *rsa.PrivateKey	
)

const (
	PKPWD = "SOMEHARDPASSWORD"
	File_Storage_Path = "/var/www/uploads/"
	
	KeyCertPath = "/var/www/keycertz/"
	PrivKeyPath = "/var/www/keycertz/mykey.pem"
	PubKeyPath  = "/var/www/keycertz/mykey.pub"			
)

func init() {
	f,ok,err := procon_fs.ReadFile(PubKeyPath)
	if (!ok || err != nil) { fmt.Println(err) } else {
		PubKeyFile, err = jwtgo.ParseRSAPublicKeyFromPEM(f)
		if err != nil { fmt.Println(err) }	
	}
	f,ok,err = procon_fs.ReadFile(PrivKeyPath)	
	if (!ok || err != nil) { fmt.Println(err) } else {
		PrivKeyFile, err = jwtgo.ParseRSAPrivateKeyFromPEMWithPassword(f, PKPWD)
		if err != nil { fmt.Println(err) }
	}	
}