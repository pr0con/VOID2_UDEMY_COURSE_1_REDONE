package procon_jwt

import (
	"time"
	"crypto/rsa"
	
	jwtgo "github.com/dgrijalva/jwt-go"
)

// Create a struct that will be encoded to a JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time
func GenerateJWT(privkeyfile *rsa.PrivateKey, name string, alias string, email string, role string) (string,error) {
	token := jwtgo.New(jwtgo.SigningMethodRS256)
	in10m := time.Now().Add(time.Duration(30) * time.Minute).Unix()
	token.Claims = jwtgo.MapClaims{
        "iss":    "pr0con.com",      // who creates the token and signs it
        "aud":    "void.pr0con.com",  // to whom the token is intended to be sent
        "exp":    in10m,             // time when the token will expire (10 minutes from now)
        "jti":    "Unique",          // a unique identifier for the token
        "iat":    time.Now().Unix(), // when the token was issued/created (now)
        "nbf":    2,                 // time before which the token is not yet valid (2 minutes ago)
        "sub":    "subject",         // the subject/principal is whom the token is about
        "scopes": "api:read,api:write",        // token scope - not a standard claim
		"name":  name,						   //not a standard claim
		"alias": alias,						   //not a standard claim
		"email": email,						   //not a standard claim
		"role" : role,						   //not a standard claim       
    }
	tokenString, err := token.SignedString(privkeyfile)
	if err != nil { return "",err } else { return tokenString, nil }
}

func ValidateJWT(publickeyfile *rsa.PublicKey, jwt string) (bool,error) {
	token, err := jwtgo.Parse(jwt, func(token *jwtgo.Token) (interface{}, error) {
	    return publickeyfile, nil
	});
	if err != nil { return false, err } else if ( token.Valid && err == nil) { return true,nil } 
	
	//should not get
	return false, err
}