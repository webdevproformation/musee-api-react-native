import { StyleSheet  } from "react-native"

export default StyleSheet.create({
    box : {
      margin : 10
    },
    boxTitle : {
      fontSize : 25,
      marginBottom: 10,
      textDecorationLine : "underline",
      textDecorationColor : "black",
      textAlign:"center"
    },
    boxSep : {
        marginVertical : 10 ,
        borderBottomColor : "black",
        borderBottomWidth : 2 ,
        paddingBottom : 10
    },
    input: {
        marginBottom: 5,
        paddingVertical: 5,
        paddingHorizontal :10 , 
        borderWidth : 1,
        borderColor : "#b3cce6",
        backgroundColor : "white"
    },
    boxSuccess : {
      marginTop : 20,
      padding : 5 ,
      backgroundColor : "green",
      color : "white"
    },
    boxErreur : {
      marginTop : 20,
      padding : 5 ,
      backgroundColor : "red",
      color : "white"
    },
    boxBtn : { flexDirection: "row", justifyContent: "space-around" },
    mr10 : { marginRight : 10} ,
    mb10 : { marginBottom : 10 }, 
    centerMr5 : {
      alignItems:"center",
      margin : 5
    }
  })

