
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:sport/Sport.dart';
// import 'package:pms/Menu.dart';
// import 'package:pms/main.dart';
// import 'package:provider/provider.dart';
// import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Sport(),
      debugShowCheckedModeBanner: false,
    );
  }
}


class Sports {
  final String id;
  final String name;
  final String description;
  final String place;
  final String image;

  Sports({required this.id, required this.place,required this.description, required this.name, required this.image});
}

class Gym {
  final String id;
  final String session_price;
  final String day;
  final String start_time;
  final String end_time;
  final Coach coach;

  Gym({required this.id, required this.session_price, required this.day, required this.start_time, required this.end_time,required this.coach});
}

class Coach {
  final String id;
  final String name;
  final double salary;
  final String phone;


  Coach({
    required this.id,
    required this.name,
    required this.salary,
    required this.phone,
  });
}

class Sauna {
  final int id;
  final String name;
  final String type;
  final String image;
  final int is_available;
  final String description;
  final int price;

  Sauna({required this.id,required this.description,required this.price,required this.is_available,required this.type,required this.name, required this.image});
}
