import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:sport/main.dart';

class GymSport extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => GymDetail();
}

class GymDetail extends State<GymSport> {
  List<Gym> gyms = [];
  List<String> week = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];

  @override
  void initState() {
    super.initState();
    gymData();
  }

  Future<void> gymData() async {
    var url = 'http://192.168.136.199:8010/api/gym';
    var res = await http.get(Uri.parse(url));
    if (res.statusCode == 200) {
      var red = jsonDecode(res.body);
      setState(() {
        gyms = List<Gym>.from(red['data'].map((data) => Gym(
          id: data['id'].toString(),
          session_price: data['session_price'] ?? 0,
          day: (data['day'] ?? 'Unknown').toLowerCase(),
          start_time: data['start_time'] ?? 'Unknown',
          end_time: data['end_time'] ?? 'Unknown',
          coach: Coach(
            id: data['coach']['id'].toString(),
            name: data['coach']['name'] ?? 'Unknown',
            salary: (data['coach']['salary'] ?? 0).toDouble(),
            phone: data['coach']['phone'] ?? 'Unknown',
          ),
        )));
      });
    }
  }

  IconData getDayIcon(String day) {
    switch (day) {
      case 'sunday': return Icons.wb_sunny;
      case 'monday': return Icons.brightness_1;
      case 'tuesday': return Icons.bolt;
      case 'wednesday': return Icons.cloud;
      case 'thursday': return Icons.beach_access;
      case 'friday': return Icons.star;
      case 'saturday': return Icons.sports;
      default: return Icons.calendar_today;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        title: const Text('Weekly Gym Schedule',style: TextStyle(color: Colors.white),),
        centerTitle: true,
        backgroundColor: Colors.pinkAccent[100],
      ),
      body: ListView.builder(
        itemCount: week.length,
        itemBuilder: (context, index) {
          String day = week[index];
          List<Gym> daySessions = gyms.where((gym) => gym.day == day).toList();

          return Card(
            margin: const EdgeInsets.all(10),
            elevation: 4,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(getDayIcon(day), color: Colors.pinkAccent[100]),
                      const SizedBox(width: 10),
                      Text(
                        day.toUpperCase(),
                        style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.pinkAccent[100],
                        ),
                      ),
                    ],
                  ),
                  const Divider(),
                  daySessions.isNotEmpty
                      ? Column(
                    children: daySessions.map((session) {
                      return Container(
                        margin: const EdgeInsets.symmetric(vertical: 8),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.deepPurple[50],
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("🏋️ Coach: ${session.coach.name}",
                                style: const TextStyle(fontWeight: FontWeight.bold)),
                            const SizedBox(height: 5),
                            Text("🕒 Time: ${session.start_time} - ${session.end_time}"),
                            Text("💰 Price: ${session.session_price} DA"),
                          ],
                        ),
                      );
                    }).toList(),
                  )
                      : Row(
                    children: const [
                      Icon(Icons.info_outline, color: Colors.grey),
                      SizedBox(width: 8),
                      Text("No session for today", style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}





