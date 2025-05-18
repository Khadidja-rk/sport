import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:sport/Sauna.dart';
import 'package:sport/main.dart';
import 'package:http/http.dart' as http;

import 'Gyms.dart';

class Sport extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return SportDetail();
  }
}

class SportDetail extends State<Sport> {
  List<Sports> sports = [];

  @override
  void initState() {
    super.initState();
    sportData();
  }

  Future<void> sportData() async {
    var url = 'http://192.168.136.199:8010/api/sport';
    var res = await http.get(Uri.parse(url));
    if (res.statusCode == 200) {
      var red = jsonDecode(res.body);
      print(red);
      setState(() {
        sports = List<Sports>.from(red.map((data) => Sports(
          name: data['name'] ?? 'Unknown',
          description: data['description'] ?? 'Unknown',
          place: data['place'] ?? 'Unknown',
          image: "http://192.168.136.199:8010/storage/" + (data['image'] ?? ''),
          id: data['id'].toString(),
        )));
      });
    }
    print(res.body);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('App Sport', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Color(0xFFDABFAA), // Beige/Brownish-beige
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFF5EFE6), Color(0xFFE8D8C3)], // Beige gradient
          ),
        ),
        child: ListView.builder(
          itemCount: sports.length,
          padding: const EdgeInsets.all(12),
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => sports[index].name == 'Gym Sport'
                        ? GymSport()
                        : SaunaSport(),
                  ),
                );
              },
              child: Container(
                margin: const EdgeInsets.symmetric(vertical: 10),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.85),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.3),
                      blurRadius: 8,
                      offset: Offset(0, 4),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Image.network(
                        sports[index].image,
                        width: double.infinity,
                        height: 180,
                        fit: BoxFit.cover,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              sports[index].name,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.brown,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              sports[index].description,
                              style: const TextStyle(
                                fontSize: 14,
                                color: Colors.brown,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),

    );
  }
}

