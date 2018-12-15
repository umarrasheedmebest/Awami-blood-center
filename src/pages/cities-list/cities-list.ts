import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the CitiesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cities-list',
  templateUrl: 'cities-list.html',
})
export class CitiesListPage {

  citiesList: any = [];
  query: any;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitiesListPage');
    this.citiesList = [
      'Azad Kashmir', 'Bagh', 'Bhimber', 'khuiratta', 'Kotli', 'Mangla', 'Mirpur', 'Muzaffarabad', 'Plandri', 'Rawalakot', 'Punch', 'Balochistan', 'Amir Chah', 'Bazdar', 'Bela', 'Bellpat', 'Bagh', 'Burj', 'Chagai', 'Chah Sandan', 'Chakku', 'Chaman', 'Chhatr', 'Dalbandin', 'Dera Bugti', 'Dhana Sar', 'Diwana', 'Duki', 'Dushi', 'Duzab', 'Gajar', 'Gandava', 'Garhi Khairo', 'Garruck', 'Ghazluna', 'Girdan', 'Gulistan', 'Gwadar', 'Gwash', 'Hab Chauki', 'Hameedabad', 'Harnai', 'Hinglaj', 'Hoshab', 'Ispikan', 'Jhal', 'Jhal Jhao', 'Jhatpat', 'Jiwani', 'Kalandi', 'Kalat', 'Kamararod', 'Kanak', 'Kandi', 'Kanpur', 'Kapip', 'Kappar', 'Karodi', 'Katuri', 'Kharan', 'Khuzdar', 'Kikki', 'Kohan', 'Kohlu', 'Korak', 'Lahri', 'Lasbela', 'Liari', 'Loralai', 'Mach', 'Mand', 'Manguchar', 'Mashki Chah', 'Maslti', 'Mastung', 'Mekhtar', 'Merui', 'Mianez', 'Murgha Kibzai', 'Musa Khel Bazar', 'Nagha Kalat', 'Nal', 'Naseerabad', 'Nauroz Kalat', 'Nur Gamma', 'Nushki', 'Nuttal', 'Ormara', 'Palantuk', 'Panjgur', 'Pasni', 'Piharak', 'Pishin', 'Qamruddin Karez', 'Qila Abdullah', 'Qila Ladgasht', 'Qila Safed', 'Qila Saifullah', 'Quetta', 'Rakhni', 'Robat Thana', 'Rodkhan', 'Saindak', 'Sanjawi', 'Saruna', 'Shabaz Kalat', 'Shahpur', 'Sharam Jogizai', 'Shingar', 'Shorap', 'Sibi', 'Sonmiani', 'Spezand', 'Spintangi', 'Sui', 'Suntsar', 'Surab', 'Thalo', 'Tump', 'Turbat', 'Umarao', 'pirMahal', 'Uthal', 'Vitakri', 'Wadh', 'Washap', 'Wasjuk', 'Yakmach', 'Zhob', 'Federally Administered Northern Areas/FANA', 'Astor', 'Baramula', 'Hunza', 'Gilgit', 'Nagar', 'Skardu', 'Shangrila', 'Shandur', 'Federally Administered Tribal Areas/FATA', 'Bajaur', 'Hangu', 'Malakand', 'Miram Shah', 'Mohmand', 'Khyber', 'Kurram', 'North Waziristan', 'South Waziristan', 'Wana', 'NWFP', 'Abbottabad', 'Ayubia', 'Adezai', 'Banda Daud Shah', 'Bannu', 'Batagram', 'Birote', 'Buner', 'Chakdara', 'Charsadda', 'Chitral', 'Dargai', 'Darya Khan', 'Dera Ismail Khan', 'Drasan', 'Drosh', 'Hangu', 'Haripur', 'Kalam', 'Karak', 'Khanaspur', 'Kohat', 'Kohistan', 'Lakki Marwat', 'Latamber', 'Lower Dir', 'Madyan', 'Malakand', 'Mansehra', 'Mardan', 'Mastuj', 'Mongora', 'Nowshera', 'Paharpur', 'Peshawar', 'Saidu Sharif', 'Shangla', 'Sakesar', 'Swabi', 'Swat', 'Tangi', 'Tank', 'Thall', 'Tordher', 'Upper Dir', 'Punjab', 'Ahmedpur East', 'Ahmed Nager Chatha', 'Ali Pur', 'Arifwala', 'Attock', 'Basti Malook', 'Bhagalchur', 'Bhalwal', 'Bahawalnagar', 'Bahawalpur', 'Bhaipheru', 'Bhakkar', 'Burewala', 'Chailianwala', 'Chakwal', 'Chichawatni', 'Chiniot', 'Chowk Azam', 'Chowk Sarwar Shaheed', 'Daska', 'Darya Khan', 'Dera Ghazi Khan', 'Derawar Fort', 'Dhaular', 'Dina City', 'Dinga', 'Dipalpur', 'Faisalabad', 'Fateh Jang', 'Gadar', 'Ghakhar Mandi', 'Gujranwala', 'Gujrat', 'Gujar Khan', 'Hafizabad', 'Haroonabad', 'Hasilpur', 'Haveli Lakha', 'Jampur', 'Jhang', 'Jhelum', 'Kalabagh', 'Karor Lal Esan', 'Kasur', 'Kamalia', 'Kamokey', 'Khanewal', 'Khanpur', 'Kharian', 'Khushab', 'Kot Addu', 'Jahania', 'Jalla Araain', 'Jauharabad', 'Laar', 'Lahore', 'Lalamusa', 'Layyah', 'Lodhran', 'Mamoori', 'Mandi Bahauddin', 'Makhdoom Aali', 'Mandi Warburton', 'Mailsi', 'Mian Channu', 'Minawala', 'Mianwali', 'Multan', 'Murree', 'Muridke', 'Muzaffargarh', 'Narowal', 'Okara', 'Renala Khurd', 'Rajan Pur', 'Pak Pattan', 'Panjgur', 'Pattoki', 'Pirmahal', 'Qila Didar Singh', 'Rabwah', 'Raiwind', 'Rajan Pur', 'Rahim Yar Khan', 'Rawalpindi', 'Rohri', 'Sadiqabad', 'Safdar Abad – (Dhaban Singh)', 'Sahiwal', 'Sangla Hill', 'Samberial', 'Sarai Alamgir', 'Sargodha', 'Shakargarh', 'Shafqat Shaheed Chowk', 'Sheikhupura', 'Sialkot', 'Sohawa', 'Sooianwala', 'Sundar (city)', 'Talagang', 'Tarbela', 'Takhtbai', 'Taxila', 'Toba Tek Singh', 'Vehari', 'Wah Cantonment', 'Wazirabad', 'Sindh', 'Ali Bandar', 'Baden', 'Chachro', 'Dadu', 'Digri', 'Diplo', 'Dokri', 'Gadra', 'Ghanian', 'Ghauspur', 'Ghotki', 'Hala', 'Hyderabad', 'Islamkot', 'Jacobabad', 'Jamesabad', 'Jamshoro', 'Janghar', 'Jati (Mughalbhin)', 'Jhudo', 'Jungshahi', 'Kandiaro', 'Karachi', 'Kashmor', 'Keti Bandar', 'Khairpur', 'Khora', 'Klupro', 'Khokhropur', 'Korangi', 'Kotri', 'Kot Sarae', 'Larkana', 'Lund', 'Mathi', 'Matiari', 'Mehar', 'Mirpur Batoro', 'Mirpur Khas', 'Mirpur Sakro', 'Mithi', 'Mithani', 'Moro', 'Nagar Parkar', 'Naushara', 'Naudero', 'Noushero Feroz', 'Nawabshah', 'Nazimabad', 'Naokot', 'Pendoo', 'Pokran', 'Qambar', 'Qazi Ahmad', 'Ranipur', 'Ratodero', 'Rohri', 'Saidu Sharif', 'Sakrand', 'Sanghar', 'Shadadkhot', 'Shahbandar', 'Shahdadpur', 'Shahpur Chakar', 'Shikarpur', 'Sujawal', 'Sukkur', 'Tando Adam', 'Tando Allahyar', 'Tando Bago', 'Tar Ahamd Rind', 'Thatta', 'Tujal', 'Umarkot', 'Veirwaro', 'Warah'
    ]
  }

  itemSelected(item) {
    console.log(item);
    this.viewCtrl.dismiss({city: item});
  }

}
