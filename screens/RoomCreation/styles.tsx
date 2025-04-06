import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  backButton: {
    fontSize: 16,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 120,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownInput: {
    padding: 12,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
    fontSize: 16,
    color: '#666666',
  },
  roomTypeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  roomTypeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 5,
  },
  selectedRoomType: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  roomTypeText: {
    color: '#333333',
    fontWeight: '500',
  },
  selectedRoomTypeText: {
    color: '#FFFFFF',
  },
  amenitiesContainer: {
    marginBottom: 10,
  },
  amenitiesDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  amenitiesText: {
    color: '#666666',
  },
  amenitiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityTagText: {
    color: '#0078D7',
    marginRight: 5,
  },
  removeAmenityButton: {
    color: '#0078D7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  amenityOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  amenityList: {
    maxHeight: 300,
  },
  hotelOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '500',
  },
  hotelAddress: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  hotelList: {
    maxHeight: 300,
  },
  noDataText: {
    textAlign: 'center',
    padding: 20,
    color: '#666666',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  addCustomButton: {
    backgroundColor: '#ECF7FD',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  addCustomButtonText: {
    color: '#0078D7',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  // New styles for multiple images
  imageUploadSection: {
    marginTop: 15,
    marginBottom: 10,
  },
  imageUploadTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  imageUploadSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CCCCCC',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  uploadButtonText: {
    color: '#666666',
    fontSize: 16,
  },
  imagesContainer: {
    marginTop: 15,
  },
  imagePreviewContainer: {
    marginRight: 10,
    position: 'relative',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
