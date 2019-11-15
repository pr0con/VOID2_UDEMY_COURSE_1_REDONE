package main

import (
	"fmt"
	"strconv"
	
	pfs "procon_fs"
)

func main() {
	fmt.Println("test procon_fs package");
	pfs.CreateFile("/var/www/go_systems/","test.txt")
	
	
	f,r,err := pfs.ReadFile("/var/www/go_systems/test.txt")	
	if err != nil { fmt.Println(err) } else {
		fmt.Println("Result: "+strconv.FormatBool(r))
		fmt.Println(string(f))		
	}

	x := "I Overwrote you...."
	pfs.WriteFile("/var/www/go_systems/test.txt", []byte(x))
	
	pfs.DeleteFile("/var/www/go_systems/test.txt");
}