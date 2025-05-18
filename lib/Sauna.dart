import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:sport/main.dart';
import 'Gyms.dart';

class SaunaSport extends StatefulWidget {
  @override
  State<SaunaSport> createState() => _SaunaDetailState();
}

class _SaunaDetailState extends State<SaunaSport>
    with SingleTickerProviderStateMixin {
  List<Sauna> saunas = [];
  int? selectedDayId;
  int? selectedTimeId;
  List<dynamic> filteredTimes = [];
  int? selectValue;
  int? selectedValue;
  late AnimationController _controller;
  List saunaT =[];
  List weekList =[];
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _controller.forward();
    saunaData();
    getTime();
    filteredTimes;
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> saunaData() async {
    final url = 'http://192.168.136.199:8010/api/sauna';
    final res = await http.get(Uri.parse(url));
    if (res.statusCode == 200) {
      final list = jsonDecode(res.body) as List<dynamic>;
      setState(() {
        saunas = list.map((data) => Sauna(
          id:            data['id'],
          name:          data['name'] ?? 'Unknown',
          description:   data['description'] ?? 'Unknown',
          type:          data['type'] ?? 'Unknown',
          is_available:  data['is_available'] ?? 1,
          price:         data['price'] ?? 0,
          image:         "http://192.168.136.199:8010/storage/${data['image'] ?? ''}",
        )).toList();
      });
    }
  }

  Future<void> getTime() async {

    final url = 'http://192.168.136.199:8010/api/app/sauna/time';
    final res = await http.get(Uri.parse(url));
    if (res.statusCode == 200) {
       final Map<String, dynamic> list = jsonDecode(res.body) ;
      setState(() {
        saunaT = List<dynamic>.from(list['data'] ?? []);
        weekList = List<dynamic>.from(list['week'] ?? []);
      });
    }
    print(saunaT);
  }

  Future<void> reserveSauna(sauna_id,time_id) async {
    var url = 'http://192.168.136.199:8010/api/app/sauna/reserve';
    var res = await http.post(Uri.parse(url) ,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
        , body: jsonEncode({"sauna_id": sauna_id , "time_id":time_id , "status":0,"reserver_id":2 }));
    print(res.body);
  }
  void showNiceDialog(BuildContext context,sauna_id) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              backgroundColor: Colors.white,
              title: Text(
                'Confirmation',
                style: TextStyle(fontWeight: FontWeight.bold, color:  Color(0xFFDABFAA)),
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [

                  DropdownButton(
                    value: selectedValue,
                    hint: Text("Select A Day"),
                    items: weekList
                        .map((item) => DropdownMenuItem(
                      value: item['id'],
                      child: Text(item['day']),
                    ))
                        .toList(),
                    onChanged: (value) {
                      setState(() {
                        selectedValue = value as int?;
                        selectValue = null;
                        filteredTimes = saunaT
                            .where((item) => item["id_week"] == selectedValue)
                            .toList();
                      });
                    },
                  ),
                  DropdownButton(
                    value: selectValue,
                    hint: Text("Select A Time"),
                    items: filteredTimes
                        .map((item) => DropdownMenuItem(
                      value: item['id'],
                      child: Text("${item['start_time']} to ${item['end_time']}"),
                    ))
                        .toList(),
                    onChanged: (value) {
                      setState(() {
                        selectValue = value as int?;
                      });
                    },
                  ),
                  Text('We Will Send An Email Message \n To Confirm Your Reservation'),
                ],
              ),
              actions: <Widget>[
                TextButton(
                  style: TextButton.styleFrom(
                    foregroundColor: Colors.red,
                  ),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text('Cancel'),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFDABFAA),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  onPressed: () {
                    reserveSauna(sauna_id,selectValue);
                    Navigator.of(context).pop();
                  },
                  child: Text('Confirm'),
                ),
              ],
            );
          },
        );
      },
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Saunas',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        backgroundColor: Color(0xFFDABFAA), // Beige
        elevation: 4,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
        child: ListView.separated(
          itemCount: saunas.length,
          separatorBuilder: (_, __) => const SizedBox(height: 12),
          itemBuilder: (context, index) {
            final s = saunas[index];
            return FadeTransition(
              opacity: _controller,
              child: GestureDetector(
                onTap: () => {},
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  elevation: 6,
                  shadowColor: Colors.brown.withOpacity(0.2),
                  color: Color(0xFFFFF6EB), // Light Beige
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                        child: AspectRatio(
                          aspectRatio: 16 / 9,
                          child: Image.network(s.image, fit: BoxFit.cover),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              s.name,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.brown,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              s.type,
                              style: const TextStyle(
                                fontSize: 16,
                                fontStyle: FontStyle.italic,
                                color: Colors.brown,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              s.description,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontSize: 14, color: Colors.black87),
                            ),
                            const SizedBox(height: 12),
                            ElevatedButton(
                              onPressed: () {
                                showNiceDialog(context,s.id);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Color(0xFFDCC6A0), // Soft beige
                                foregroundColor: Colors.brown,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                                elevation: 3,
                              ),
                              child: const Text(
                                'Reserve',
                                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                              ),
                            ),
                            const SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  s.price > 0 ? "\$${s.price}" : "Free",
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.brown,
                                  ),
                                ),
                                Icon(
                                  s.is_available == 1 ? Icons.check_circle : Icons.block,
                                  color: s.is_available == 1 ? Colors.green : Colors.red,
                                ),
                              ],
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


